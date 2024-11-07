/**
 * 유저 정보 카드의 상태를 정의하는 타입입니다.
 * @typedef {'notReady' | 'ready' | 'gaming'} UserStatus
 */
export type ReadyStatus = 'notReady' | 'ready';
export type UserStatus = ReadyStatus | 'gaming';
export type UserRank = 1 | 2 | 3;
