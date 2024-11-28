import { useMemo } from 'react';
import { PlayerRole } from '@troublepainter/core';
import { GameCanvas } from '@/components/canvas/GameCanvas';
import RoleModal from '@/components/modal/RoleModal';
import RoundEndModal from '@/components/modal/RoundEndModal';
import { QuizTitle } from '@/components/ui/QuizTitle';
import { useTimer } from '@/hooks/useTimer';
import { useGameSocketStore } from '@/stores/socket/gameSocket.store';
import { cn } from '@/utils/cn';

const GameRoomPage = () => {
  const { players, room, roomSettings, roundAssignedRole } = useGameSocketStore();
  const timers = useTimer();

  const shouldHideCanvas = useMemo(() => {
    const isGuesser = roundAssignedRole === PlayerRole.GUESSER;
    const isDrawing = room?.status === 'DRAWING';
    return isGuesser && isDrawing;
  }, [roundAssignedRole, room?.status]);

  const remainingTime = useMemo(() => {
    switch (room?.status) {
      case 'DRAWING':
        return timers.DRAWING ?? roomSettings?.drawTime;
      case 'GUESSING':
        return timers.GUESSING ?? 10;
      default:
        return 0;
    }
  }, [room?.status, timers, roomSettings?.drawTime]);

  if (!room || !players || !roomSettings) return null;

  return (
    <>
      <RoleModal />
      <RoundEndModal />
      <QuizTitle
        currentRound={room.currentRound}
        totalRound={roomSettings.totalRounds}
        title={room?.currentWord || '구경꾼이라 안보임'}
        remainingTime={remainingTime || 0}
      />
      <div
        className={cn(
          'relative flex h-[800px] w-full items-center justify-center',
          shouldHideCanvas ? 'hidden' : 'block',
        )}
      >
        <GameCanvas
          currentRound={room.currentRound}
          roomStatus={room.status}
          role={roundAssignedRole || PlayerRole.GUESSER}
          maxPixels={100000}
        />
      </div>
    </>
  );
};

export default GameRoomPage;
