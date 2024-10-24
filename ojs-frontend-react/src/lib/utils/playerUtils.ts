import { Controls, KeyboardLayout, PlayerObject } from "../..";
import { useKeyboardControls } from "@react-three/drei";

export const movePlayer = (player: PlayerObject): void => {
  if (!player.characterModel.current) return;

  const currentPos = player.characterModel.current.position.clone();
  const duration = 0.5;
};

export const moveForward = (player: PlayerObject) => {
  if (player.rigidBody.current) {
    player.rigidBody.current.applyImpulse(
      { x: 0, y: 0, z: -player.impulse },
      true
    );
  }
};

export const moveLeft = (player: PlayerObject) => {
  if (player.rigidBody.current) {
    player.rigidBody.current.applyImpulse(
      { x: -player.impulse, y: 0, z: 0 },
      true
    );
  }
};

export const moveBackwards = (player: PlayerObject) => {
  if (player.rigidBody.current) {
    player.rigidBody.current.applyImpulse(
      { x: 0, y: 0, z: player.impulse },
      true
    );
  }
};

export const moveRight = (player: PlayerObject) => {
  if (player.rigidBody.current) {
    player.rigidBody.current.applyImpulse(
      { x: player.impulse, y: 0, z: 0 },
      true
    );
  }
};

export const jump = (player: PlayerObject) => {
  if (!player.characterModel.current) return;

  if (player.rigidBody.current && player.isOnFloor) {
    player.rigidBody.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
    player.isOnFloor = false;
  }
};
