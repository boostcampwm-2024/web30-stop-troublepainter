import type {
  CRDTSyncMessage,
  CheckAnswerRequest,
  JoinRoomRequest,
  JoinRoomResponse,
  ReconnectRequest,
  UpdateSettingsRequest,
} from '@troublepainter/core';
import { useSocketStore } from '@/stores/socket/socket.store';

// socket 요청만 처리하는 핸들러
export const gameSocketHandlers = {
  joinRoom: (request: JoinRoomRequest): Promise<JoinRoomResponse> => {
    const socket = useSocketStore.getState().sockets.game;
    if (!socket) throw new Error('Socket not connected');

    return new Promise(() => {
      socket.emit('joinRoom', request);
    });
  },

  reconnect: (request: ReconnectRequest): Promise<void> => {
    const socket = useSocketStore.getState().sockets.game;
    if (!socket) throw new Error('Socket not connected');

    return new Promise(() => {
      socket.emit('reconnect', request);
    });
  },

  updateSettings: (request: UpdateSettingsRequest): Promise<void> => {
    const socket = useSocketStore.getState().sockets.game;
    if (!socket) throw new Error('Socket not connected');

    return new Promise((resolve) => {
      socket.emit('updateSettings', request);
      resolve();
    });
  },

  gameStart: (): Promise<void> => {
    const socket = useSocketStore.getState().sockets.game;
    if (!socket) throw new Error('Socket not connected');

    return new Promise((resolve) => {
      socket.emit('gameStart');
      resolve();
    });
  },

  checkAnswer: (request: CheckAnswerRequest): Promise<void> => {
    const socket = useSocketStore.getState().sockets.game;
    if (!socket) throw new Error('Socket not connected');

    return new Promise((resolve) => {
      socket.emit('checkAnswer', request);
      resolve();
    });
  },

  submittedDrawing: (drawing: CRDTSyncMessage): Promise<void> => {
    const socket = useSocketStore.getState().sockets.game;
    if (!socket) throw new Error('Socket not connected');

    return new Promise((resolve) => {
      socket.emit('submittedDrawing', { drawing });
      resolve();
    });
  },

  // updatePlayerStatus: async (request) => {
  //   const socket = useSocketStore.getState().sockets.game;
  //   if (!socket) throw new Error('Socket not connected');

  //   return new Promise((resolve, reject) => {
  //     socket.emit('updatePlayerStatus', request, (error?: SocketError) => {
  //       if (error) {
  //         set({ error });
  //         reject(error);
  //       } else {
  //         resolve();
  //       }
  //     });
  //   });
  // },

  // leaveRoom: async () => {
  //   const socket = useSocketStore.getState().sockets.game;
  //   if (!socket) throw new Error('Socket not connected');

  //   return new Promise((resolve) => {
  //     socket.emit('leaveRoom', () => {
  //       get().actions.reset();
  //       resolve();
  //     });
  //   });
  // },
};

export type GameSocketHandlers = typeof gameSocketHandlers;
