import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";

export interface GameObject {
  keyboardLayout: KeyboardLayout;
}

export interface PlayerObject {
  characterModel: React.RefObject<THREE.Mesh>;
  characterRigidBody: React.RefObject<RapierRigidBody>;
  reticle: React.RefObject<THREE.Mesh>;
  mouseMovement: React.RefObject<{ x: number; y: number }>;
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
