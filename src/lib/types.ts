import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };

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
  characterModel: React.RefObject<THREE.Mesh>;
  rigidBody: React.RefObject<RapierRigidBody>;
  mouseMovement: React.RefObject<Coordinate>;
  reticle: React.RefObject<THREE.Mesh>;
  moveSpeed: number;
  health: number;
  isOnFloor: boolean;
  impulse: number;
  controls: ControlsObject;
}

export interface GameProps {
  player: PlayerObject;
  game: GameObject;
}

export interface ControlsObject {
  forward: string;
  left: string;
  backward: string;
  right: string;
  jump: string;
}

export interface CameraControllerProps {
  characterModel: React.RefObject<THREE.Mesh>;
}
