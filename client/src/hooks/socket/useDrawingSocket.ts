// 이벤트 중심적 구조, 드로잉 관련 단일 책임, 실시간 드로잉 데이터
// 특정 기능(드로잉)에 집중된 이벤트 핸들링
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { DrawSubmitResponse, DrawUpdateResponse } from '@troublepainter/core';
import { useGameSocketStore } from '@/stores/socket/gameSocket.store';
import { SocketNamespace } from '@/stores/socket/socket.config';
import { useSocketStore } from '@/stores/socket/socket.store';

interface UseDrawingSocketProps {
  onDrawUpdate: (response: DrawUpdateResponse) => void;
  onDrawingTimeEnded: (response: DrawSubmitResponse) => void;
  onSubmitRequest: () => void;
}

/**
 * 드로잉 데이터의 실시간 공유를 관리하는 Socket Hook입니다.
 *
 * @remarks
 * Canvas 컴포넌트에서 발생하는 드로잉을 실시간으로 다른 참가자들과 동기화합니다.
 * useDrawing Hook과 함께 사용되어 로컬 드로잉과 원격 드로잉을 통합 관리합니다.
 *
 * @param props - Hook 설정
 * @param props.onDrawUpdate - 원격 드로잉 데이터 수신 시 호출될 콜백
 *
 * @example
 * ```tsx
 * // GameCanvas.tsx에서의 사용 예시
 * const GameCanvas = ({ role }: GameCanvasProps) => {
 *   const { applyDrawing } = useDrawing(canvasRef);
 *
 *   // 소켓 연결 및 원격 드로잉 처리
 *   const { isConnected, sendDrawing } = useDrawingSocket({
 *     onDrawUpdate: (response) => {
 *       // 원격 드로잉 데이터를 캔버스에 적용
 *       applyDrawing(response.drawingData);
 *     }
 *   });
 *
 *   // 드로잉 종료 시 데이터 전송
 *   const handleDrawEnd = useCallback(() => {
 *     const currentDrawing = getCurrentDrawing();
 *     if (currentDrawing && isConnected) {
 *       sendDrawing(currentDrawing);
 *     }
 *     stopDrawing();
 *   }, [stopDrawing, sendDrawing]);
 *
 *   return <Canvas {...props} />;
 * };
 * ```
 *
 * @returns
 * - `isConnected` - 드로잉 소켓 연결 상태
 * - `sendDrawing` - 드로잉 데이터를 다른 참가자들에게 전송하는 함수
 *
 * @category Hooks
 */
export const useDrawingSocket = ({ onDrawUpdate, onDrawingTimeEnded, onSubmitRequest }: UseDrawingSocketProps) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { sockets, connected, actions: socketActions } = useSocketStore();
  const { currentPlayerId } = useGameSocketStore();

  // 소켓 연결 설정
  const handleDrawUpdate = useCallback(
    (response: DrawUpdateResponse) => {
      if (response.playerId !== currentPlayerId) {
        onDrawUpdate(response);
      }
    },
    [currentPlayerId, onDrawUpdate],
  );

  const handleSubmitDrawing = useCallback(() => {
    console.log('Received submitDrawing event');
    onSubmitRequest();
  }, [onSubmitRequest]);

  const handleDrawingTimeEnded = useCallback(
    (response: DrawSubmitResponse) => {
      onDrawingTimeEnded(response);
    },
    [onDrawingTimeEnded],
  );

  useEffect(() => {
    if (!roomId || !currentPlayerId) return;

    socketActions.connect(SocketNamespace.DRAWING, {
      roomId,
      playerId: currentPlayerId,
    });

    return () => {
      socketActions.disconnect(SocketNamespace.DRAWING);
    };
  }, [roomId, currentPlayerId, socketActions]);

  // 이벤트 리스너 설정
  useEffect(() => {
    const drawingSocket = sockets.drawing;
    const gameSocket = sockets.game;

    if (!drawingSocket || !gameSocket) return;

    // drawing 네임스페이스 이벤트
    drawingSocket.on('drawUpdated', handleDrawUpdate);

    // game 네임스페이스 이벤트
    gameSocket.on('submitDrawing', handleSubmitDrawing);
    gameSocket.on('drawingTimeEnded', handleDrawingTimeEnded);

    return () => {
      drawingSocket.off('drawUpdated', handleDrawUpdate);
      gameSocket.off('submitDrawing', handleSubmitDrawing);
      gameSocket.off('drawingTimeEnded', handleDrawingTimeEnded);
    };
  }, [sockets.drawing, sockets.game, handleDrawUpdate, handleSubmitDrawing, handleDrawingTimeEnded]);

  return {
    isConnected: connected.drawing,
  };
};
