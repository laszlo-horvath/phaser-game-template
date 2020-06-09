import { SafeZone } from 'typings/intefaces';
import { getSafeZone } from 'config/scaling';

const safeZone: SafeZone = getSafeZone();

// Game
export const GRAVITY: number = safeZone.width * 1.5;
export const JUMP_FORCE: number = GRAVITY * 1.2;

export const MAX_PAD: number = 13;
export const MAX_SIDES: number = 3;
export const MAX_COINS: number = 3;
export const MAX_UP: number = 1;
export const MAX_CLOUDS: number = 2;
export const MIN_JUMP_TO_DRAW = 1500;

// Development
export const IS_DEBUG: boolean = true;
