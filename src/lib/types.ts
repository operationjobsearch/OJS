import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };
export type KeyState = { value: string; isPressed: boolean };

export interface GameObject {
  // State
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
}

export interface PlayerObject {
  // Refs
  characterModel: React.RefObject<THREE.Object3D>;
  rigidBody: React.RefObject<RapierRigidBody>;
  mouseMovement: React.RefObject<Coordinate>;
  reticle: React.RefObject<THREE.Mesh>;

  // State
  controls: ControlsObject;
  modelRotation: number;
  isOnFloor: boolean;
  isWalking: boolean;
  isRunning: boolean;

  // Stats
  velocity: number;
  jumpImpulse: number;
  health: number;
}

export interface GameProps {
  player: PlayerObject;
  game: GameObject;
}

export interface ControlsObject {
  forward: KeyState;
  left: KeyState;
  back: KeyState;
  right: KeyState;
  jump: KeyState;
}

export interface CameraControllerProps {
  characterModel: React.RefObject<THREE.Mesh>;
}
