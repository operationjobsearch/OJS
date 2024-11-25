import { Vector } from "@dimforge/rapier3d";
import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };
export type KeyState = { value: string; isPressed: boolean };

export interface GameObject {
  // State
  fps: number;
  isPointerLocked: boolean;
  isWindowActive: boolean;

  // Settings
  keyboardLayout: KeyboardLayout;

  // Camera
  cameraVerticalOffset: number;
  cameraLookAtOffset: number;
  cameraAngleTheta: number;
  cameraAnglePhi: number;
  cameraRadius: number;
  cameraSpeedRatio: number;
}

export interface PlayerObject {
  // Refs
  characterModel: React.RefObject<THREE.Object3D>;
  rigidBody: React.RefObject<RapierRigidBody>;
  mouseMovement: React.RefObject<Coordinate>;

  // State
  controls: ControlsObject;
  directions: MovementVectorObject;
  modelRotation: number;
  isOnFloor: boolean;
  isWalking: boolean;
  isRunning: boolean;
  canMove: boolean;

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

export interface GameProps {
  player: PlayerObject;
  game: GameObject;
}

export interface CameraProps {
  characterModel: React.RefObject<THREE.Mesh>;
}

export interface ProjectileProps {
  key: string;
  position?: Vector;
  direction: THREE.Vector3;
  velocity: number;
  isFriendly: boolean;
  onExpire?: CallableFunction;
}
