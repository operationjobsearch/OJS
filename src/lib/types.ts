import { CollisionTarget, RapierRigidBody } from "@react-three/rapier";
import Stats from "stats.js";
import * as THREE from "three";

export enum RenderOrders {
  base,
  hud,
}

export enum EnemyTypes {
  jobPosting,
  ghostJob,
}

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };
export type KeyState = { value: string; isPressed: boolean };

export interface GameObject {
  // State
  stats: Stats;
  fpsLimit: number;
  isPointerLocked: boolean;
  isWindowActive: boolean;

  setFocus: () => void;
  setBlur: () => void;
  setPointerLockChange: () => void;

  // Settings
  isDebugEnabled: boolean;
  keyboardLayout: KeyboardLayout;

  setDebugMode: (isEnabled: boolean) => void;
}

export interface CameraObject {
  // Camera
  cameraVerticalOffset: number;
  cameraLookAtOffset: number;
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

export interface PlayerObject {
  // Refs
  rigidBody: React.RefObject<RapierRigidBody> | null;
  characterModel: React.RefObject<THREE.Object3D> | null;
  reticle: React.RefObject<THREE.Object3D> | null;
  mouseMovement: Coordinate;

  // State
  isFiring: boolean;
  isWalking: boolean;
  modelRotation: number;
  lastProjectile: number;
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
  setRigidBody: (rigidBody: React.RefObject<RapierRigidBody>) => void;
  setReticle: (reticle: React.RefObject<THREE.Mesh>) => void;
  setMouseMovement: (e: MouseEvent) => void;

  setIsFiring: (isMouseDown: boolean) => void;
  setLastProjectile: (timeStamp: number) => void;
  setIsWalking: (controls: ControlsObject) => void;

  setModelRotation: (θ: number) => void;
  setDirectionVectors: (camera: THREE.Camera) => void;
  setVelocity: (frameTime: number) => void;
  setAnimationState: (
    animations: Record<string, THREE.AnimationAction | null>,
    frameTime: number
  ) => void;

  handleCollisions: (
    otherObject: CollisionTarget,
    isCollisionEnter: boolean
  ) => void;
  handleFloorCollision: (
    rigidBodyObject: CollisionTarget["rigidBodyObject"],
    isCollisionEnter: boolean
  ) => void;
}

export interface EnemyObject {
  enemies: EnemyProps[];
  spawnEnemy: (newEnemy: EnemyProps) => void;
  destroyEnemy: (id: number) => void;
}

export interface ProjectileObject {
  projectiles: ProjectileProps[];
  spawnProjectile: (newProjectile: ProjectileProps) => void;
  destroyProjectile: (id: number) => void;
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

export interface CameraProps {
  characterModel: React.RefObject<THREE.Mesh>;
}

export interface ProjectileProps {
  id: number;
  position: THREE.Vector3;
  direction: THREE.Vector3;
  velocity: number;
  isFriendly: boolean;
  onExpire?: CallableFunction;
}

export interface EnemyProps {
  id: number;
  type: EnemyTypes | null;
  rigidBody: React.RefObject<RapierRigidBody> | null;
  onExpire?: CallableFunction;
}
