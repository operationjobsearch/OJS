import * as THREE from 'three';
import { CollisionTarget, RapierRigidBody } from '@react-three/rapier';
import { Coordinate } from '..';

//#region Player
export type KeyState = { value: string; isPressed: boolean };

export interface PlayerStats {
  health: number;
}

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
  handleProjectileCollision: (
    otherObject: CollisionTarget['rigidBodyObject'],
    isCollisionEnter: boolean
  ) => void;

  setPlayer: (player: PlayerStats) => void;
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
