import * as THREE from 'three';
import { EnemyTypes, ProjectileProps } from '..';

//#region Game
export type KeyboardLayout = 'QWERTY' | 'Colemak';
export type Coordinate = { x: number; y: number };

export enum DampingFactors {
  Rotational = 8,
  Translational = 5,
}

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

export enum CollisionGroups {
  Player = 1,
  Enemy = 2,
  EnemyProjectile = 3,
  PlayerProjectile = 4,
}

export interface GameObject {
  // State
  gameState: GameState;
  stats: Stats;
  fpsTarget: number;
  isPaused: boolean;
  currentStage: GameStage;
  isStageCleared: boolean;

  setPaused: (paused: boolean) => void;
  advanceGame: () => void;
  setGameStage: (state: GameStage) => void;
  setGameState: (state: GameState) => void;
  setStageCleared: (isCleared: boolean) => void;
  setFpsTarget: (fpsCap: number) => void;

  // Settings
  cameraVerticalOffset: number;
  cameraHorizontalOffset: number;
  cameraAngle: number;

  isDebugEnabled: boolean;
  isAntiAliasingEnabled: boolean;
  pixelRatio: number;
  keyboardLayout: KeyboardLayout;

  setDebugMode: (isEnabled: boolean) => void;

  projectiles: ProjectileProps[];
  spawnProjectile: (newProjectile: ProjectileProps) => void;
  destroyProjectile: (id: string) => void;
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
