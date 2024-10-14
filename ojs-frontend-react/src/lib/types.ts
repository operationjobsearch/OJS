import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };

export interface GameObject {
  keyboardLayout: KeyboardLayout;
}

export interface PlayerObject {
  modelRef: React.RefObject<THREE.Mesh>;
  moveSpeed: number;
  health: number;
}

export interface GameProps {
  player: PlayerObject;
  game: GameObject;
}

export interface CameraControllerProps {
  modelRef: React.RefObject<THREE.Mesh>;
}

export declare class EnhancedOrbitControls extends OrbitControls {
  constructor(camera: THREE.Camera, domElement: any = null) {
    super(camera, domElement);
  }

  // rotate(angle: number) {
  //   this.getPolarAngle()
  //   this.
  // }

  // rotate(angle: number) {
  //   this.rotateLeft(angle);
  // }
}
