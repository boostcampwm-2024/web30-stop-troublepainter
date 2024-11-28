import { PlayerRole, RoomStatus } from '@troublepainter/core';
import { GameCanvas } from '@/components/canvas/GameCanvas';

const ExamplePageCanvasOnly = () => {
  return (
    <div className="flex items-center justify-center">
      <GameCanvas role={PlayerRole.DEVIL} currentRound={1} roomStatus={RoomStatus.DRAWING} />
    </div>
  );
};

export default ExamplePageCanvasOnly;
