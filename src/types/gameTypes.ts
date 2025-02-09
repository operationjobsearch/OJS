import { EnemyTypes } from '..';

//#region Game
export type KeyboardLayout = 'QWERTY' | 'Colemak';
export type Coordinate = { x: number; y: number };

export enum RenderOrders {
  Base = 0,
  Hud = 1,
}

export enum GameState {
  MainMenu = 1,
  Active = 2,
  Lost = 3,
  Won = 4,
}

export enum GameStage {
  Application = 1,
  Assessment = 2,
  Interview = 3,
}

export interface GameObject {
  // State
  gameState: GameState;
  stats: Stats;
  fpsLimit: number;
  isPaused: boolean;
  currentStage: GameStage;
  isStageCleared: boolean;

  pauseOnPointerLockChange: () => void;
  advanceGame: () => void;
  setGameState: (state: GameState) => void;
  setStageCleared: (isCleared: boolean) => void;

  // Settings
  isDebugEnabled: boolean;
  isAntiAliasingEnabled: boolean;
  keyboardLayout: KeyboardLayout;

  setDebugMode: (isEnabled: boolean) => void;
}

export interface StageConfig {
  enemies: Record<EnemyTypes, number>;
  instantSpawn: number;
  spawnInterval: number;
}

export interface EndMenuProps {
  endState: GameState.Won | GameState.Lost;
}
//#endregion
