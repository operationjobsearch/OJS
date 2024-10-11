import * as THREE from "three";
import gsap from "gsap";
import { Coordinate } from "../types";

export const moveCamera = (
  cameraRef: React.RefObject<THREE.PerspectiveCamera>,
  modelRef: React.RefObject<THREE.Mesh>,
  mouseRef: React.RefObject<Coordinate>
): void => {
  if (cameraRef.current && modelRef.current && mouseRef.current) {
    const playerPosition = modelRef.current.position;

    const cameraOffset = new THREE.Vector3(0, 5, 8);
    const cameraPosition = playerPosition.clone().add(cameraOffset);
    cameraRef.current.position.lerp(cameraPosition, 0.1);

    const rotationSpeed = 1;
    const rotationAboutX = mouseRef.current.y * rotationSpeed;
    const rotationAboutY = -mouseRef.current.x * rotationSpeed;

    // cameraRef.current.position.y += 0.5 * Math.PI * mouseRef.current.y; // Pivot horizontally around the player
    // cameraRef.current.position.x += 0.5 * Math.PI * mouseRef.current.x; // Pivot vertically

    // console.log("camX", cameraRef.current.position.x);
    // console.log("camY", cameraRef.current.position.y);

    const focalPoint = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y,
      playerPosition.z
    );
    cameraRef.current.lookAt(focalPoint);
  }
};
