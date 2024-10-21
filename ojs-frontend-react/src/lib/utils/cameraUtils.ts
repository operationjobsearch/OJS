import * as THREE from "three";
import { Coordinate, GameObject } from "../..";

export const moveCamera = (
  camera: THREE.Camera,
  characterModel: React.RefObject<THREE.Mesh>,
  mouseMovement: React.RefObject<Coordinate>,
  game: GameObject
): void => {
  if (
    !(
      characterModel.current &&
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
  const x =
    characterModel.current.position.x +
    game.cameraRadius *
      Math.sin(game.cameraAngleTheta) *
      Math.cos(game.cameraAnglePhi);
  const y =
    characterModel.current.position.y +
    game.cameraRadius * Math.sin(game.cameraAnglePhi) +
    game.cameraVerticalOffset;
  const z =
    characterModel.current.position.z +
    game.cameraRadius *
      Math.cos(game.cameraAngleTheta) *
      Math.cos(game.cameraAnglePhi);

  camera.position.set(x, y, z);

  // Make the camera look slightly above the player's head
  const lookAtPosition = characterModel.current.position.clone();
  lookAtPosition.y += game.cameraLookAtOffset;
  camera.lookAt(lookAtPosition);
};
