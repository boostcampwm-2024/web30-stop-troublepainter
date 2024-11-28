import { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useCallback, useEffect, useRef } from 'react';
import { PlayerRole, RoomStatus } from '@troublepainter/core';
import { Canvas } from '@/components/canvas/CanvasUI';
import { COLORS_INFO, MAINCANVAS_RESOLUTION_WIDTH } from '@/constants/canvasConstants';
import { drawingSocketHandlers } from '@/handlers/socket/drawingSocket.handler';
import { gameSocketHandlers } from '@/handlers/socket/gameSocket.handler';
import { useDrawing } from '@/hooks/canvas/useDrawing';
import { useDrawingSocket } from '@/hooks/socket/useDrawingSocket';
import { useCoordinateScale } from '@/hooks/useCoordinateScale';
import { CanvasEventHandlers } from '@/types/canvas.types';
import { getCanvasContext } from '@/utils/getCanvasContext';
import { getDrawPoint } from '@/utils/getDrawPoint';

interface GameCanvasProps {
  role: PlayerRole;
  maxPixels?: number;
  currentRound: number;
  roomStatus: RoomStatus;
}

/**
 * 게임용 캔버스 컴포넌트입니다.
 *
 * @remarks
 * useDrawing과 useDrawingSocket을 통합하여 실시간 드로잉 기능을 제공합니다.
 * 플레이어의 역할에 따라 드로잉 권한을 관리합니다.
 *
 * @param props - 컴포넌트 props
 * @param props.role - 플레이어 역할 (PAINTER/DEVIL/GUESSER)
 * @param props.maxPixels - 최대 사용 가능 픽셀 수
 *
 * @example
 * ```tsx
 * // GameRoom.tsx에서의 사용 예시
 * const GameRoom = () => {
 *   return (
 *     <div>
 *       <GameCanvas
 *         role={PlayerRole.PAINTER}
 *         maxPixels={100000}
 *       />
 *       <ChatComponent />
 *     </div>
 *   );
 * };
 * ```
 *
 * @category Components
 */
const GameCanvas = ({ role, maxPixels = 100000, currentRound, roomStatus }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { convertCoordinate } = useCoordinateScale(MAINCANVAS_RESOLUTION_WIDTH, canvasRef);

  const {
    currentColor,
    setCurrentColor,
    brushSize,
    setBrushSize,
    drawingMode,
    setDrawingMode,
    inkRemaining,
    startDrawing,
    continueDrawing,
    stopDrawing,
    applyDrawing,
    canUndo,
    canRedo,
    undo,
    redo,
    getAllDrawingData,
    resetCanvas,
  } = useDrawing(canvasRef, roomStatus, {
    maxPixels,
  });

  useEffect(() => {
    resetCanvas();
  }, [currentRound, resetCanvas]);

  const { isConnected } = useDrawingSocket({
    onDrawUpdate: (response) => {
      if (response.drawingData) {
        applyDrawing(response.drawingData);
      }
    },
    onSubmitRequest: () => {
      if (!isConnected) return;

      const allDrawingData = getAllDrawingData();
      if (!allDrawingData) return;

      void gameSocketHandlers.submittedDrawing(allDrawingData);
    },
    onDrawingTimeEnded: (response) => {
      if (!response.drawing) return;

      resetCanvas();
      applyDrawing(response.drawing);
    },
  });

  const COLORS = COLORS_INFO.map((color) => ({
    ...color,
    isSelected: currentColor === color.backgroundColor,
    onClick: () => setCurrentColor(color.backgroundColor),
  }));

  const handleDrawStart = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>) => {
      if (!isConnected) return;

      const { canvas } = getCanvasContext(canvasRef);
      const point = getDrawPoint(e, canvas);
      const convertPoint = convertCoordinate(point);

      const crdtDrawingData = startDrawing(convertPoint);
      if (crdtDrawingData) {
        void drawingSocketHandlers.sendDrawing(crdtDrawingData);
      }
    },
    [startDrawing, convertCoordinate, isConnected],
  );

  const handleDrawMove = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>) => {
      const { canvas } = getCanvasContext(canvasRef);
      const point = getDrawPoint(e, canvas);
      const convertPoint = convertCoordinate(point);

      const crdtDrawingData = continueDrawing(convertPoint);
      if (crdtDrawingData) {
        void drawingSocketHandlers.sendDrawing(crdtDrawingData);
      }
    },
    [continueDrawing, convertCoordinate, isConnected],
  );

  const handleDrawEnd = useCallback(() => {
    stopDrawing();
  }, [stopDrawing]);

  const handleUndo = useCallback(() => {
    if (!isConnected) return;
    const updates = undo();
    if (!updates) return;
    updates.forEach((update) => {
      void drawingSocketHandlers.sendDrawing(update);
    });
  }, [undo, isConnected]);

  const handleRedo = useCallback(() => {
    if (!isConnected) return;
    const updates = redo();
    if (!updates) return;
    updates.forEach((update) => {
      void drawingSocketHandlers.sendDrawing(update);
    });
  }, [redo, isConnected]);

  const canvasEventHandlers: CanvasEventHandlers = {
    onMouseDown: handleDrawStart,
    onMouseMove: handleDrawMove,
    onMouseUp: handleDrawEnd,
    onMouseLeave: handleDrawEnd,
    onTouchStart: handleDrawStart,
    onTouchMove: handleDrawMove,
    onTouchEnd: handleDrawEnd,
    onTouchCancel: handleDrawEnd,
  };

  return (
    <Canvas
      canvasRef={canvasRef}
      isDrawable={(role === 'PAINTER' || role === 'DEVIL') && roomStatus === 'DRAWING'}
      colors={true ? COLORS : []}
      brushSize={brushSize}
      setBrushSize={setBrushSize}
      drawingMode={drawingMode}
      onDrawingModeChange={setDrawingMode}
      inkRemaining={inkRemaining}
      maxPixels={maxPixels}
      canUndo={canUndo}
      canRedo={canRedo}
      onUndo={handleUndo}
      onRedo={handleRedo}
      canvasEvents={canvasEventHandlers}
    />
  );
};

export { GameCanvas };
