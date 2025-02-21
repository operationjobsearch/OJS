import * as THREE from 'three';
import { CollisionTarget, RapierRigidBody } from '@react-three/rapier';

//#region Player
export interface PlayerObject {
  // Refs
  rigidBody: React.RefObject<RapierRigidBody> | null;
  characterModel: React.RefObject<THREE.Object3D> | null;
  animationActions: Record<string, THREE.AnimationAction | null>;

  // State
  isMoving: boolean;
  isFiringPrimary: boolean;
  isChargingSecondary: boolean;
  shouldFireSecondary: boolean;
  modelRotation: number;
  lastAttack: number;
  chargeStartTime: number;
  isOnFloor: boolean;
  directions: MovementVectorObject;
  aimDirection: THREE.Vector3;

  // Stats
  moveSpeed: number;
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
  setAnimations: (animationActions: Record<string, THREE.AnimationAction | null>) => void;

  setAimDirection: (direction: THREE.Vector3) => void;
  setIsFiringPrimary: (isLeftClickDown: boolean) => void;
  setIsChargingSecondary: (isRightClickDown: boolean) => void;
  setChargeStartTime: (timeStamp: number) => void;
  setShouldFireSecondary: (wasRightClickReleased: boolean) => void;
  setLastAttack: (timeStamp: number) => void;
  setIsMoving: (moving: boolean) => void;
  setDirectionVectors: (camera: THREE.Camera) => void;
  setModelRotation: (Θ: number) => void;

  handleCollisions: (otherObject: CollisionTarget, isCollisionEnter: boolean) => void;
  handleFloorCollision: (
    rigidBodyObject: CollisionTarget['rigidBodyObject'],
    isCollisionEnter: boolean
  ) => void;
  handleProjectileCollision: (
    otherObject: CollisionTarget['rigidBodyObject'],
    isCollisionEnter: boolean
  ) => void;

  setPlayer: (player: PlayerObject) => void;
}

export interface MovementVectorObject {
  [key: string]: THREE.Vector3;
  forwardVector: THREE.Vector3;
  leftVector: THREE.Vector3;
  backVector: THREE.Vector3;
  rightVector: THREE.Vector3;
}
//#endregion
