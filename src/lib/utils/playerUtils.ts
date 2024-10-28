import * as THREE from "three";
import { PlayerObject } from "../..";

export const movePlayer = (player: PlayerObject, key: string): void => {
  if (player.rigidBody.current) {
    const movement = new THREE.Vector3(0, 0, 0);

    switch (key) {
      case player.controls.forward:
        movement.z = -player.impulse;
        break;
      case player.controls.left:
        movement.x = -player.impulse;
        break;
      case player.controls.backward:
        movement.z = player.impulse;
        break;
      case player.controls.right:
        movement.x = player.impulse;
        break;
      case player.controls.jump:
        if (player.rigidBody.current && player.isOnFloor) {
          player.rigidBody.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
          player.isOnFloor = false;
        }
        break;
    }
    player.rigidBody.current?.applyImpulse(movement, true);
  }
};
