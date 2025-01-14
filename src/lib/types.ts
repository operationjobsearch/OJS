import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };
export type KeyState = { value: string; isPressed: boolean };

export interface GameObject {
  // State
  fpsLimit: number;
  isPointerLocked: boolean;
  isWindowActive: boolean;

  setFocus: () => void;
  setBlur: () => void;
  setPointerLockChange: () => void;

  // Settings
  keyboardLayout: KeyboardLayout;
}

export interface CameraObject {
  // Camera
  cameraVerticalOffset: number;
  cameraLookAtOffset: number;
  cameraAngleTheta: number;
  cameraAnglePhi: number;
  cameraRadius: number;
  cameraSpeedRatio: number;

  setCameraAngles: (frameTime: number, mouseMovement: Coordinate) => void;
  setCameraPosition: (
    camera: THREE.Camera,
    playerRigidBody: React.RefObject<RapierRigidBody> | null
  ) => void;
}

export interface PlayerObject {
  // Refs
  characterModel: React.RefObject<THREE.Object3D> | null;
  rigidBody: React.RefObject<RapierRigidBody> | null;
  mouseMovement: Coordinate;

  setCharacterModel: (characterModel: React.RefObject<THREE.Object3D>) => void;
  setRigidBody: (rigidBody: React.RefObject<RapierRigidBody>) => void;
  setMouseMovement: (e: MouseEvent) => void;

  // State
  controls: ControlsObject;
  directions: MovementVectorObject;
  modelRotation: number;
  isOnFloor: boolean;
  isWalking: boolean;
  isRunning: boolean;
  canMove: boolean;

  setIsWalking: (controls: ControlsObject) => void;
  setModelRotation: (cameraAngleTheta: number) => void;
  setDirectionVectors: (camera: THREE.Camera) => void;
  setAnimationState: (
    animations: Record<string, THREE.AnimationAction | null>,
    frameTime: number
  ) => void;
  setVelocity: (frameTime: number) => void;

  // Stats
  velocity: number;
  runMultiplier: number;
  jumpVelocity: number;
  health: number;
  projectileVelocity: number;
  projectileDamage: number;
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
