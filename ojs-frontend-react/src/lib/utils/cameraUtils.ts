import * as THREE from "three";
import gsap from "gsap";
import { Coordinate } from "../types";

export const moveCamera = (
  camera: THREE.Camera,
  modelRef: React.RefObject<THREE.Mesh>,
  mousePos: Coordinate
): void => {
  if (modelRef.current) {
    const playerPosition = modelRef.current.position;
    // const cameraPos = cameraRef.current.position.clone();
    const cameraOffset = new THREE.Vector3(0, 5, 8);
    const cameraPos = playerPosition.clone().add(cameraOffset);

    // radians to revolutions
    // const revolution = 2 * Math.PI;

    // // spherical coordinates
    // const azimuthAnglePhi = revolution * mousePos.x; // horizontal rotation (about y-axis)
    // const polarAngleTheta = 0.5 * revolution * mousePos.y; // vertical rotation (about x-axis)

    // console.log("horizontal rotation: ", azimuthAnglePhi);
    // console.log("vertical rotation: ", polarAngleTheta);

    // cartesian coordinates
    // const x = Math.sin(azimuthAnglePhi) * Math.sin(polarAngleTheta);
    // const y = Math.cos(polarAngleTheta);
    // const z = playerPosition.z + 3;

    // const cameraPos: THREE.Vector3 = new THREE.Vector3(x, y, z);
    // cameraPos.normalize();

    camera.lookAt(playerPosition);
    camera.position.lerp(cameraPos, 0.1);
  }
};
