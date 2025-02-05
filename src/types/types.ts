import Stats from 'stats.js';
import * as THREE from 'three';
import { CollisionTarget, RapierRigidBody } from '@react-three/rapier';

//#region Attack
export enum AttackTypes {
  // Player
  Primary = 'Resume',
  Secondary = 'TailoredResume',

  // Enemy
  JobPostingAtk = 'RejectionLetter',
  GhostJobAtk = 'IndefiniteWait',
}

export interface AttackStats {
  type: AttackTypes;
  baseDamage: number;
  chargeMultiplier?: number;
}

export interface AttackFactory {
  projectiles: ProjectileProps[];
  spawnProjectile: (newProjectile: ProjectileProps) => void;
  destroyProjectile: (id: string) => void;
}

export interface ProjectileProps {
  id: string;
  position: THREE.Vector3;
  direction: THREE.Vector3;
  velocity: number;
  isFriendly: boolean;
  onExpire?: CallableFunction;
}

export const AttackConfig: Record<string, AttackStats> = {
  [AttackTypes.Primary]: {
    type: AttackTypes.Primary,
    baseDamage: 10,
  },
  [AttackTypes.Secondary]: {
    type: AttackTypes.Secondary,
    baseDamage: 50,
    chargeMultiplier: 3,
  },
  [AttackTypes.JobPostingAtk]: {
    type: AttackTypes.JobPostingAtk,
    baseDamage: 20,
  },
  [AttackTypes.GhostJobAtk]: {
    type: AttackTypes.GhostJobAtk,
    baseDamage: 10,
  },
};
//#endregion

//#region Player
export type KeyState = { value: string; isPressed: boolean };

export interface PlayerObject {
  // Refs
  rigidBody: React.RefObject<RapierRigidBody> | null;
  characterModel: React.RefObject<THREE.Object3D> | null;
  reticle: React.RefObject<THREE.Object3D> | null;
  mouseMovement: Coordinate;

  // State
  isFiringPrimary: boolean;
  isChargingSecondary: boolean;
  shouldFireSecondary: boolean;
  isWalking: boolean;
  modelRotation: number;
  lastAttack: number;
  chargeStartTime: number;
  directions: MovementVectorObject;
  controls: ControlsObject;
  isOnFloor: boolean;
  isRunning: boolean;
  canMove: boolean;

  // Stats
  velocity: number;
  runMultiplier: number;
  jumpVelocity: number;
  health: number;
  attackSpeed: number;
  projectileVelocity: number;
  projectileDamage: number;
  playerColliderRadius: number;

  // Functions
  setCharacterModel: (characterModel: React.RefObject<THREE.Object3D>) => void;
  setRigidBody: (rb: React.RefObject<RapierRigidBody>) => void;
  setReticle: (reticle: React.RefObject<THREE.Mesh>) => void;
  setMouseMovement: (e: MouseEvent) => void;

  setIsFiringPrimary: (isLeftClickDown: boolean) => void;
  setIsChargingSecondary: (isRightClickDown: boolean) => void;
  setChargeStartTime: (timeStamp: number) => void;
  setShouldFireSecondary: (wasRightClickReleased: boolean) => void;
  setLastAttack: (timeStamp: number) => void;
  setIsWalking: (controls: ControlsObject) => void;

  setModelRotation: (θ: number) => void;
  setDirectionVectors: (camera: THREE.Camera) => void;
  setVelocity: (frameTime: number) => void;
  setAnimationState: (
    animations: Record<string, THREE.AnimationAction | null>,
    frameTime: number
  ) => void;

  handleCollisions: (otherObject: CollisionTarget, isCollisionEnter: boolean) => void;
  handleFloorCollision: (
    rigidBodyObject: CollisionTarget['rigidBodyObject'],
    isCollisionEnter: boolean
  ) => void;
}

export interface ControlsObject {
  [key: string]: KeyState;
  forward: KeyState;
  left: KeyState;
  back: KeyState;
  right: KeyState;
  jump: KeyState;
}

export interface MovementVectorObject {
  [key: string]: THREE.Vector3;
  forwardVector: THREE.Vector3;
  leftVector: THREE.Vector3;
  backVector: THREE.Vector3;
  rightVector: THREE.Vector3;
}
//#endregion

//#region Enemy
export enum EnemyTypes {
  JobPosting = 'JobPosting',
  GhostJob = 'GhostJob',
}

export interface EnemyFactory {
  enemies: EnemyProps[];
  spawnEnemy: (newEnemy: EnemyProps) => void;
  damageEnemy: (id: string, damage: number) => void;
  setEnemyRb: (id: string, rb: React.RefObject<RapierRigidBody>) => void;
  attack: (type: EnemyTypes) => void;
  handleCollisions: (id: string, otherObject: CollisionTarget, isCollisionEnter: boolean) => void;
}

export interface EnemyProps {
  id: string;
  type: EnemyTypes;
  attackType: AttackTypes;
  position: THREE.Vector3;
  rigidBody: React.RefObject<RapierRigidBody> | null;

  health: number;
  attackSpeed: number;
}

export const EnemyConfig: Record<EnemyTypes, EnemyProps> = {
  [EnemyTypes.JobPosting]: {
    id: '',
    type: EnemyTypes.JobPosting,
    attackType: AttackTypes.JobPostingAtk,
    rigidBody: null,
    position: new THREE.Vector3(),

    attackSpeed: 1,
    health: 100,
  },
  [EnemyTypes.GhostJob]: {
    id: '',
    type: EnemyTypes.GhostJob,
    attackType: AttackTypes.GhostJobAtk,
    rigidBody: null,
    position: new THREE.Vector3(),

    attackSpeed: 2,
    health: 150,
  },
};
//#endregion

//#region Game
export type KeyboardLayout = 'QWERTY' | 'Colemak';
export type Coordinate = { x: number; y: number };

export enum RenderOrders {
  Base = 0,
  Hud = 1,
}

export enum GameStage {
  Application = 1,
  Assessment = 2,
  Interview = 3,
}

export interface GameObject {
  // State
  stats: Stats;
  fpsLimit: number;
  isGameOver: boolean;
  currentStage: GameStage;
  isPaused: boolean;

  pauseOnPointerLockChange: () => void;
  setGameStage: (stage: GameStage) => void;
  setGameOver: (isOver: boolean) => void;

  // Settings
  isDebugEnabled: boolean;
  keyboardLayout: KeyboardLayout;

  setDebugMode: (isEnabled: boolean) => void;
}

export interface StageConfig {
  enemies: Record<EnemyTypes, number>;
  instantSpawn: number;
  spawnInterval: number;
}

export const SpawnConfig: Record<GameStage, StageConfig> = {
  [GameStage.Application]: {
    enemies: {
      [EnemyTypes.JobPosting]: 5,
      [EnemyTypes.GhostJob]: 2,
    },
    instantSpawn: 3,
    spawnInterval: 5,
  },
  [GameStage.Assessment]: {
    enemies: {
      [EnemyTypes.JobPosting]: 8,
      [EnemyTypes.GhostJob]: 4,
    },
    instantSpawn: 5,
    spawnInterval: 4,
  },
  [GameStage.Interview]: {
    enemies: {
      [EnemyTypes.JobPosting]: 10,
      [EnemyTypes.GhostJob]: 6,
    },
    instantSpawn: 6,
    spawnInterval: 3,
  },
};
//#endregion

//#region Camera
export interface CameraObject {
  // Camera
  positionOffsetY: number;
  lookAtOffsetY: number;
  θ: number;
  φ: number;
  cameraRadius: number;
  cameraSpeedRatio: number;
  dampingFactor: number;

  setCameraAngles: (frameTime: number, mouseMovement: Coordinate) => void;
  setCameraPosition: (
    camera: THREE.Camera,
    playerRigidBody: React.RefObject<RapierRigidBody> | null
  ) => void;
}
//#endregion
