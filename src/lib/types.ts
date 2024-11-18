import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };
export type KeyState = { value: string; isPressed: boolean };

export interface GameObject {
  // State
  frameInterval: number;
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
  reticle: React.RefObject<THREE.Mesh>;

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
}

export interface GameProps {
  player: PlayerObject;
  game: GameObject;
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

export interface CameraControllerProps {
  characterModel: React.RefObject<THREE.Mesh>;
}
