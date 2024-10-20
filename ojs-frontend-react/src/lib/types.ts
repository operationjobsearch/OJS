import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };

export interface GameObject {
  // State
  isWindowActive: boolean;
  isPointerLocked: boolean;

  // Settings
  keyboardLayout: KeyboardLayout;

  // Camera
  cameraAngleTheta: number;
  cameraAnglePhi: number;
  cameraRadius: number;
  cameraVerticalOffset: number;
  cameraLookAtOffset: number;
}

export interface PlayerObject {
  characterModel: React.RefObject<THREE.Mesh>;
  characterRigidBody: React.RefObject<RapierRigidBody>;
  reticle: React.RefObject<THREE.Mesh>;
  mouseMovement: React.RefObject<Coordinate>;
  moveSpeed: number;
  health: number;
}

export interface GameProps {
  player: PlayerObject;
  game: GameObject;
}

export interface CameraControllerProps {
  characterModel: React.RefObject<THREE.Mesh>;
}
