import * as THREE from "three";
import { Coordinate, GameObject } from "../..";
import { RapierRigidBody } from "@react-three/rapier";

export const moveCamera = (
  camera: THREE.Camera,
  characterModel: React.RefObject<THREE.Object3D>,
  characterRigidBody: React.RefObject<RapierRigidBody>,
  mouseMovement: React.RefObject<Coordinate>,
  game: GameObject
): void => {
  if (
    !(
      characterModel.current &&
      characterRigidBody.current &&
      mouseMovement.current &&
      game.isPointerLocked &&
      game.isWindowActive
    )
  )
    return;

  // Capture mouse deltas and reset them after use to avoid momentum-like behavior
  const mouseDeltaX = -mouseMovement.current.x * 0.001;
  const mouseDeltaY = mouseMovement.current.y * 0.001;

  mouseMovement.current.x = 0;
  mouseMovement.current.y = 0;

  // Update horizontal and vertical angles
  const newTheta = game.cameraAngleTheta + mouseDeltaX;
  const newPhi = Math.max(
    -Math.PI / 3,
    Math.min(Math.PI / 3, game.cameraAnglePhi + mouseDeltaY)
  );

  game.cameraAngleTheta = newTheta;
  game.cameraAnglePhi = newPhi;

  // Calculate the new camera position using spherical coordinates
  const rigidBodyPos = characterRigidBody.current.translation();

  const x =
    rigidBodyPos.x +
    game.cameraRadius *
      Math.sin(game.cameraAngleTheta) *
      Math.cos(game.cameraAnglePhi);
  const y =
    rigidBodyPos.y +
    game.cameraRadius * Math.sin(game.cameraAnglePhi) +
    game.cameraVerticalOffset;
  const z =
    rigidBodyPos.z +
    game.cameraRadius *
      Math.cos(game.cameraAngleTheta) *
      Math.cos(game.cameraAnglePhi);

  camera.position.set(x, y, z);

  // Make the camera look slightly above the player's head
  const lookAtPosition = new THREE.Vector3(
    rigidBodyPos.x,
    rigidBodyPos.y + game.cameraLookAtOffset,
    rigidBodyPos.z
  );

  const lerpTarget = camera.position.clone().lerp(lookAtPosition, 0.05);
  camera.lookAt(lerpTarget);
};
