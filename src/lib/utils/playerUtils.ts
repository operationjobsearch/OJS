import * as THREE from "three";
import { PlayerObject } from "../..";

export const updatePlayerState = (player: PlayerObject): void => {
  if (!player.characterModel.current) return;

  const controls = player.controls;
  player.isWalking =
    controls.forward.isPressed ||
    controls.left.isPressed ||
    controls.back.isPressed ||
    controls.right.isPressed;

  updateModelRotation(player);
  player.characterModel.current.rotation.y = player.modelRotation;
};

export const updateModelRotation = (player: PlayerObject) => {
  if (!player.characterModel.current) return;

  const controls = player.controls;

  if (player.isWalking) {
    if (controls.back.isPressed && controls.left.isPressed)
      player.modelRotation = -Math.PI * 0.25;
    else if (controls.back.isPressed && controls.right.isPressed)
      player.modelRotation = Math.PI * 0.25;
    else if (controls.forward.isPressed && controls.left.isPressed)
      player.modelRotation = -Math.PI * 0.75;
    else if (controls.forward.isPressed && controls.right.isPressed)
      player.modelRotation = Math.PI * 0.75;
    else if (controls.right.isPressed) player.modelRotation = Math.PI * 0.5;
    else if (controls.left.isPressed) player.modelRotation = -Math.PI * 0.5;
    else if (controls.back.isPressed) player.modelRotation = 0;
    else if (controls.forward.isPressed) player.modelRotation = Math.PI;
  }
};

export const movePlayer = (
  player: PlayerObject,
  key: string,
  isKeyDown: boolean
): void => {
  if (player.rigidBody.current) {
    const controls = player.controls;
    const movement = new THREE.Vector3(0, 0, 0);

    switch (key) {
      case controls.forward.value:
        movement.z = -player.movementImpulse;
        controls.forward.isPressed = isKeyDown;
        break;
      case controls.left.value:
        movement.x = -player.movementImpulse;
        controls.left.isPressed = isKeyDown;
        break;
      case controls.back.value:
        movement.z = player.movementImpulse;
        controls.back.isPressed = isKeyDown;
        break;
      case controls.right.value:
        movement.x = player.movementImpulse;
        controls.right.isPressed = isKeyDown;
        break;
      case controls.jump.value:
        if (player.rigidBody.current && player.isOnFloor) {
          player.rigidBody.current.applyImpulse(
            { x: 0, y: player.jumpImpulse, z: 0 },
            true
          );
          player.isOnFloor = false;
        }
        break;
    }

    player.rigidBody.current?.applyImpulse(movement, true);
  }
};

export const animatePlayer = (
  player: PlayerObject,
  animations: Record<string, THREE.AnimationAction | null>,
  key: string
): void => {
  if (player.isWalking && !animations.Walk?.isRunning()) {
    animations.Walk?.play();
  }
  if (!player.isWalking && animations.Walk?.isRunning()) {
    animations.Walk?.stop();
  }
};
