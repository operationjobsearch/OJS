import * as THREE from "three";
import { GameObject, PlayerObject } from "../..";

export const moveCamera = (
  camera: THREE.Camera,
  player: PlayerObject,
  game: GameObject,
  frameDelta: number
): void => {
  const { rigidBody, mouseMovement } = player;
  const {
    cameraRadius,
    cameraLookAtOffset,
    cameraVerticalOffset,
    cameraSpeedRatio,
  } = game;
  if (
    !(
      rigidBody.current &&
      mouseMovement.current &&
      game.isPointerLocked &&
      game.isWindowActive
    )
  )
    return;

  // Capture mouse deltas and reset them after use to avoid momentum-like behavior
  const mouseDeltaX = -mouseMovement.current.x * cameraSpeedRatio;
  const mouseDeltaY = mouseMovement.current.y * cameraSpeedRatio;

  mouseMovement.current.x = 0;
  mouseMovement.current.y = 0;

  // Update horizontal and vertical angles
  const newTheta = game.cameraAngleTheta + mouseDeltaX * frameDelta;
  const newPhi = Math.max(
    -Math.PI / 3,
    Math.min(Math.PI / 3, game.cameraAnglePhi + mouseDeltaY * frameDelta)
  );

  game.cameraAngleTheta = newTheta;
  game.cameraAnglePhi = newPhi;

  // Calculate the new camera position using spherical coordinates
  const rigidBodyPos = rigidBody.current.translation();

  const x =
    rigidBodyPos.x +
    cameraRadius *
      Math.sin(game.cameraAngleTheta) *
      Math.cos(game.cameraAnglePhi);
  const y =
    rigidBodyPos.y +
    cameraRadius * Math.sin(game.cameraAnglePhi) +
    cameraVerticalOffset;
  const z =
    rigidBodyPos.z +
    cameraRadius *
      Math.cos(game.cameraAngleTheta) *
      Math.cos(game.cameraAnglePhi);

  camera.position.set(x, y, z);

  // Make the camera look slightly above the player's head
  const lookAtPosition = new THREE.Vector3(
    rigidBodyPos.x,
    rigidBodyPos.y + cameraLookAtOffset,
    rigidBodyPos.z
  );

  const lerpTarget = camera.position
    .clone()
    .lerp(lookAtPosition, 0.05 * frameDelta);
  camera.lookAt(lerpTarget);
};
