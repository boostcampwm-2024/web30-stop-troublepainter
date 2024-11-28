import { RefObject, useCallback } from 'react';
import {
  Point,
  CRDTMessage,
  CRDTMessageTypes,
  CRDTUpdateMessage,
  CRDTSyncMessage,
  RoomStatus,
} from '@troublepainter/core';
import { useDrawingOperation } from './useDrawingOperation';
import { useDrawingState } from './useDrawingState';
import { DRAWING_MODE } from '@/constants/canvasConstants';

/**
 * 캔버스 드로잉 기능을 관리하는 Hook입니다.
 *
 * @remarks
 * 캔버스의 실제 드로잉 작업을 처리합니다.
 * - 펜/채우기 모드 드로잉
 * - 실행 취소/다시 실행
 * - 잉크 잔량 관리
 * - 실시간 드로잉 데이터 동기화 및 기록
 *
 * 드로잉은 mousedown부터 mouseup까지를 하나의 단위로 처리하며,
 * 실시간으로는 각 stroke 단위로 동기화하고 히스토리는 mouseup 단위로 기록됩니다.
 *
 * @param canvasRef - 캔버스 엘리먼트의 RefObject
 * @param options - 드로잉 설정 옵션
 * @param options.maxPixels - 최대 사용 가능한 픽셀 수
 *
 * @example
 * ```tsx
 * const GameCanvas = ({ role, maxPixels = 100000 }: GameCanvasProps) => {
 *   const canvasRef = useRef<HTMLCanvasElement>(null);
 *
 *   const {
 *     currentColor,
 *     brushSize,
 *     drawingMode,
 *     inkRemaining,
 *     startDrawing,
 *     continueDrawing,
 *     stopDrawing,
 *   } = useDrawing(canvasRef, { maxPixels });
 *
 *   const handleDrawStart = useCallback((e: ReactMouseEvent | ReactTouchEvent) => {
 *     const point = getDrawPoint(e, canvasRef.current);
 *     startDrawing(point);
 *   }, [startDrawing]);
 *
 *   return (
 *     <Canvas
 *       canvasRef={canvasRef}
 *       isDrawable={true}
 *       brushSize={brushSize}
 *       inkRemaining={inkRemaining}
 *     />
 *   );
 * };
 * ```
 *
 * @returns 드로잉 관련 상태와 메소드들을 포함하는 객체
 * @property currentColor - 현재 선택된 색상
 * @property setCurrentColor - 현재 색상을 변경하는 함수
 * @property brushSize - 현재 브러시 크기
 * @property setBrushSize - 브러시 크기를 변경하는 함수
 * @property drawingMode - 현재 드로잉 모드 (펜/채우기)
 * @property setDrawingMode - 드로잉 모드를 변경하는 함수
 * @property inkRemaining - 남은 잉크량
 * @property canUndo - 실행 취소 가능 여부
 * @property canRedo - 다시 실행 가능 여부
 * @property startDrawing - 드로잉 시작 함수 (mousedown)
 * @property continueDrawing - 드로잉 진행 함수 (mousemove)
 * @property stopDrawing - 드로잉 종료 함수 (mouseup)
 * @property applyDrawing - 외부 드로잉 데이터 적용 함수
 * @property undo - 마지막 드로잉 작업을 실행 취소하는 함수
 * @property redo - 마지막으로 실행 취소된 작업을 다시 실행하는 함수
 *
 * @category Hooks
 */
export const useDrawing = (
  canvasRef: RefObject<HTMLCanvasElement>,
  roomStatus: RoomStatus,
  options?: { maxPixels?: number },
) => {
  const state = useDrawingState(options);
  const operation = useDrawingOperation(canvasRef, state);

  const startDrawing = useCallback(
    (point: Point): CRDTUpdateMessage | null => {
      if (state.checkInkAvailability() === false || !state.crdtRef.current) return null;

      state.currentStrokeIdsRef.current = [];
      const drawingData =
        state.drawingMode === DRAWING_MODE.FILL
          ? operation.floodFill(Math.floor(point.x), Math.floor(point.y))
          : {
              points: [point],
              style: operation.getCurrentStyle(),
            };

      if (!drawingData) return null;

      const strokeId = state.crdtRef.current.addStroke(drawingData);
      state.currentStrokeIdsRef.current.push(strokeId);
      operation.drawStroke(drawingData);

      return {
        type: CRDTMessageTypes.UPDATE,
        state: {
          key: strokeId,
          register: state.crdtRef.current.state[strokeId],
        },
      };
    },
    [state, operation],
  );

  const continueDrawing = useCallback(
    (point: Point): CRDTUpdateMessage | null => {
      if (!state.crdtRef.current || state.inkRemaining <= 0) return null;
      if (state.drawingMode === DRAWING_MODE.FILL) return null;

      const lastStrokeId = state.currentStrokeIdsRef.current[state.currentStrokeIdsRef.current.length - 1];
      const lastStroke = state.crdtRef.current.strokes.find((s) => s.id === lastStrokeId);
      if (!lastStroke) return null;

      const updatedDrawing = {
        ...lastStroke.stroke,
        points: [...lastStroke.stroke.points, point],
      };

      const lastPoint = lastStroke.stroke.points[lastStroke.stroke.points.length - 1];
      const pixelsUsed = Math.ceil(
        Math.sqrt(Math.pow(point.x - lastPoint.x, 2) + Math.pow(point.y - lastPoint.y, 2)) * state.brushSize,
      );
      state.setInkRemaining((prev: number) => Math.max(0, prev - pixelsUsed));

      const strokeId = state.crdtRef.current.addStroke(updatedDrawing);
      state.currentStrokeIdsRef.current.push(strokeId);
      operation.drawStroke(updatedDrawing);

      return {
        type: CRDTMessageTypes.UPDATE,
        state: {
          key: strokeId,
          register: state.crdtRef.current.state[strokeId],
        },
      };
    },
    [state, operation],
  );

  const stopDrawing = useCallback(() => {
    if (!state.crdtRef.current || state.currentStrokeIdsRef.current.length === 0) return;

    if (state.historyPointerRef.current < state.strokeHistoryRef.current.length - 1) {
      state.strokeHistoryRef.current = state.strokeHistoryRef.current.slice(0, state.historyPointerRef.current + 1);
    }

    const lastStrokeId = state.currentStrokeIdsRef.current[state.currentStrokeIdsRef.current.length - 1];
    const lastStroke = state.crdtRef.current.strokes.find((s) => s.id === lastStrokeId);

    if (!lastStroke) return;

    state.strokeHistoryRef.current.push({
      strokeIds: [...state.currentStrokeIdsRef.current],
      isLocal: true,
      drawingData: lastStroke.stroke,
    });
    state.historyPointerRef.current = state.strokeHistoryRef.current.length - 1;

    state.currentStrokeIdsRef.current = [];
    state.updateHistoryState();
  }, [state]);

  const undo = useCallback((): CRDTUpdateMessage[] | null => {
    if (!state.crdtRef.current || state.historyPointerRef.current < 0) return null;

    let currentEntry = state.strokeHistoryRef.current[state.historyPointerRef.current];
    while (currentEntry && !currentEntry.isLocal && state.historyPointerRef.current > 0) {
      state.historyPointerRef.current--;
      currentEntry = state.strokeHistoryRef.current[state.historyPointerRef.current];
    }

    if (!currentEntry?.isLocal) return null;

    const updates = currentEntry.strokeIds.map((strokeId): CRDTUpdateMessage => {
      state.crdtRef.current!.deleteStroke(strokeId);
      return {
        type: CRDTMessageTypes.UPDATE,
        state: {
          key: strokeId,
          register: state.crdtRef.current!.state[strokeId],
        },
      };
    });

    state.historyPointerRef.current--;
    state.updateHistoryState();
    operation.redrawCanvas();

    return updates;
  }, [state, operation]);

  const redo = useCallback((): CRDTUpdateMessage[] | null => {
    if (!state.crdtRef.current || state.historyPointerRef.current >= state.strokeHistoryRef.current.length - 1)
      return null;

    let nextEntry = state.strokeHistoryRef.current[state.historyPointerRef.current + 1];
    while (
      nextEntry &&
      !nextEntry.isLocal &&
      state.historyPointerRef.current < state.strokeHistoryRef.current.length - 1
    ) {
      state.historyPointerRef.current++;
      nextEntry = state.strokeHistoryRef.current[state.historyPointerRef.current + 1];
    }

    if (!nextEntry?.isLocal) return null;

    const updates = nextEntry.strokeIds.map((): CRDTUpdateMessage => {
      const strokeId = state.crdtRef.current!.addStroke(nextEntry.drawingData);
      return {
        type: CRDTMessageTypes.UPDATE,
        state: {
          key: strokeId,
          register: state.crdtRef.current!.state[strokeId],
        },
      };
    });

    nextEntry.strokeIds = updates.map((update) => update.state.key);

    state.historyPointerRef.current++;
    state.updateHistoryState();
    operation.redrawCanvas();

    return updates;
  }, [state, operation]);

  const applyDrawing = useCallback(
    (crdtDrawingData: CRDTMessage) => {
      if (!state.crdtRef.current) return;

      if (crdtDrawingData.type === CRDTMessageTypes.SYNC) {
        state.crdtRef.current.merge(crdtDrawingData.state);
        operation.redrawCanvas();

        if (roomStatus === 'DRAWING') {
          state.strokeHistoryRef.current = [];
          state.historyPointerRef.current = -1;
          state.updateHistoryState();
        }
      } else if (crdtDrawingData.type === CRDTMessageTypes.UPDATE) {
        const { key, register } = crdtDrawingData.state;
        const peerId = key.split('-')[0];
        const isLocalUpdate = peerId === state.currentPlayerId;

        if (!state.crdtRef.current.mergeRegister(key, register) || isLocalUpdate) return;
        operation.redrawCanvas();

        const stroke = register[2];
        // stroke가 null이 아닌 경우 (삭제되지 않은 경우) 히스토리 추가
        if (!stroke) return;
        if (state.historyPointerRef.current < state.strokeHistoryRef.current.length - 1) {
          state.strokeHistoryRef.current = state.strokeHistoryRef.current.slice(0, state.historyPointerRef.current + 1);
        }

        state.strokeHistoryRef.current.push({
          strokeIds: [key],
          isLocal: false,
          drawingData: stroke,
        });
        state.historyPointerRef.current++;
        state.updateHistoryState();
      }
    },
    [state.currentPlayerId, operation.redrawCanvas, state.updateHistoryState, roomStatus],
  );

  const getAllDrawingData = useCallback((): CRDTSyncMessage | null => {
    if (!state.crdtRef.current) return null;

    return {
      type: CRDTMessageTypes.SYNC,
      state: state.crdtRef.current.state,
    };
  }, [state.crdtRef]);

  const resetCanvas = useCallback(() => {
    state.resetDrawingState(); // 상태 초기화
    operation.clearCanvas(); // 캔버스 초기화
  }, [state.resetDrawingState, operation.clearCanvas]);

  return {
    currentColor: state.currentColor,
    setCurrentColor: state.setCurrentColor,
    brushSize: state.brushSize,
    setBrushSize: state.setBrushSize,
    drawingMode: state.drawingMode,
    setDrawingMode: state.setDrawingMode,
    inkRemaining: state.inkRemaining,
    canUndo: state.canUndo,
    canRedo: state.canRedo,
    startDrawing,
    continueDrawing,
    stopDrawing,
    applyDrawing,
    undo,
    redo,
    getAllDrawingData,
    resetCanvas,
  };
};
