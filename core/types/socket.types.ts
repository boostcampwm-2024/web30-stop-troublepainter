import { CRDTMessage, DrawingData } from '@/types/crdt.types';
import {
  Player,
  PlayerRole,
  Room,
  RoomSettings,
  TimerType,
} from '@/types/game.types';

// 웹소켓 이벤트의 기본 응답 형식을 정의하는 제네릭 인터페이스
// export interface SocketResponse<T = unknown> {
//   data?: T;
//   error?: SocketError;
// }
// => 각 응답 타입은 Game Flow Event Specifications에 작성

// 웹소켓 에러 정보를 정의하는 인터페이스
export interface SocketError {
  code: SocketErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

// 웹소켓 에러 코드 정의
export enum SocketErrorCode {
  // 클라이언트 에러 (4xxx)
  BAD_REQUEST = 4000,
  UNAUTHORIZED = 4001,
  FORBIDDEN = 4003,
  NOT_FOUND = 4004,
  VALIDATION_ERROR = 4400,
  RATE_LIMIT = 4429,

  // 서버 에러 (5xxx)
  INTERNAL_ERROR = 5000,
  NOT_IMPLEMENTED = 5001,
  SERVICE_UNAVAILABLE = 5003,

  // 게임 로직 에러 (6xxx)
  GAME_NOT_STARTED = 6001,
  GAME_ALREADY_STARTED = 6002,
  INVALID_TURN = 6003,
  ROOM_FULL = 6004,
  ROOM_NOT_FOUND = 6005,
  PLAYER_NOT_FOUND = 6006,
  INSUFFICIENT_PLAYERS = 6007,

  // 연결 관련 에러 (7xxx)
  CONNECTION_ERROR = 7000,
  CONNECTION_TIMEOUT = 7001,
  CONNECTION_CLOSED = 7002,
}

// 클라이언트 - 서버 구조의 요청 - 응답 타입
// ----------------------------------------------------------------------------------------------------------------------

// 0. 연결 관리
export interface ReconnectRequest {
  roomId: string;
  playerId: string;
}

// 1. 방 생성 및 입장
export interface JoinRoomRequest {
  roomId: string;
}

export interface JoinRoomResponse {
  room: Room;
  roomSettings: RoomSettings;
  playerId?: string;
  players: Player[];
}

export interface PlayerLeftResponse {
  leftPlayerId: string;
  players: Player[];
}

// 2. 대기방 설정
export interface UpdateSettingsRequest {
  settings: Partial<RoomSettings>;
}

export interface UpdateSettingsResponse {
  settings: RoomSettings;
}

export interface TimerSyncResponse {
  remaining: number;
  timerType: TimerType;
}

export interface DrawingTimeEnded {
  drawingData: DrawingData;
}

export interface ReadyRequest {
  isReady: boolean;
}

export interface ReadyResponse {
  playerId: string;
  isReady: boolean;
}

export interface GameStartResponse {
  countdown: number;
  roles: Record<string, PlayerRole>;
  initialWord?: string;
}

// 3. 게임 진행
export interface RoundStartResponse {
  assignedRole: PlayerRole;
  roundNumber: number;
  roles: {
    painters?: string[];
    devils?: string[];
    guessers: string[];
  };
  word?: string;
  drawTime: number;
}

export interface RoundTimeUpdateResponse {
  roundNumber: number;
  remainingTime: number;
}

export interface RoundEndResponse {
  roundNumber: number;
  word: string;
  winner: Player;
  players: Player[];
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  playerId: string;
  nickname: string;
  message: string;
  createdAt: string; // Redis X
}

export interface CheckAnswerRequest {
  answer: string;
}

export interface DrawRequest {
  drawingData: CRDTMessage;
}

export interface DrawUpdateResponse {
  playerId: string;
  drawingData: CRDTMessage;
}

export interface DrawSubmitResponse {
  roomStatus: any;
  drawing: CRDTMessage;
}

// Socket.IO 이벤트 타입 정의
// ----------------------------------------------------------------------------------------------------------------------

// 게임 서버 이벤트 타입 정의
export type GameServerEvents = {
  joinedRoom: (response: JoinRoomResponse) => void;
  playerJoined: (response: JoinRoomResponse) => void;
  playerLeft: (response: PlayerLeftResponse) => void;
  settingUpdated: (response: UpdateSettingsResponse) => void;
  playerStatusUpdated: (response: ReadyResponse) => void;
  gameStarted: (response: GameStartResponse) => void;
  roundStarted: (response: RoundStartResponse) => void;
  roundEnded: (response: RoundEndResponse) => void;
  error: (error: SocketError) => void;
};
// 게임 클라이언트 이벤트 타입 정의
export type GameClientEvents = {
  reconnect: (request: ReconnectRequest) => void;
  joinRoom: (
    request: JoinRoomRequest,
    callback: (response: JoinRoomResponse) => void
  ) => void;
  updateSettings: (
    request: UpdateSettingsRequest,
    callback: (response: UpdateSettingsResponse) => void
  ) => void;
  updatePlayerStatus: (
    request: ReadyRequest,
    callback: (response: ReadyResponse) => void
  ) => void;
};

// 드로잉 서버 이벤트 타입 정의
export type DrawingServerEvents = {
  drawTimeUpdated: (response: RoundTimeUpdateResponse) => void;
  drawUpdated: (response: DrawUpdateResponse) => void;
  submitDrawing: () => void;
  drawingTimeEnded: (response: DrawSubmitResponse) => void;
  error: (error: SocketError) => void;
};
// 드로잉 클라이언트 이벤트 타입 정의
export type DrawingClientEvents = {
  connect: (request: ReconnectRequest) => void;
  reconnect: (request: ReconnectRequest) => void;
  draw: (request: DrawRequest) => void;
};

// 채팅 서버 이벤트 타입 정의
export type ChatServerEvents = {
  messageReceived: (response: ChatResponse) => void;
  error: (error: SocketError) => void;
};
// 채팅 클라이언트 이벤트 타입 정의
export type ChatClientEvents = {
  sendMessage: (request: ChatRequest) => void;
};
