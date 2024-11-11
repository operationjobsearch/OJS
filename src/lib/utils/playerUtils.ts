import * as THREE from "three";
import { PlayerObject, ControlsObject, GameObject } from "../..";
import { CollisionTarget } from "@react-three/rapier";

export const updatePlayerState = (
  game: GameObject,
  player: PlayerObject,
  camera: THREE.Camera,
  animations: Record<string, THREE.AnimationAction | null>
): void => {
  const { characterModel, controls } = player;
  if (!characterModel.current) return;

  player.isWalking =
    controls.forward.isPressed ||
    controls.left.isPressed ||
    controls.back.isPressed ||
    controls.right.isPressed;

  updateModelRotation(player, game);
  updateDirectionVectors(player, camera);
  updateAnimationState(player, animations);
};

const updateDirectionVectors = (
  player: PlayerObject,
  camera: THREE.Camera
): void => {
  const { forwardVector, leftVector, rightVector, backVector } =
    player.directions;

  camera.getWorldDirection(forwardVector);
  forwardVector.y = 0;

  rightVector.crossVectors(forwardVector, camera.up).normalize();
  leftVector.copy(rightVector).negate();
  backVector.copy(forwardVector).negate();
};

const updateModelRotation = (player: PlayerObject, game: GameObject): void => {
  const { characterModel, isWalking } = player;
  const { cameraAngleTheta } = game;

  player.modelRotation = Math.PI + cameraAngleTheta;
  if (characterModel.current && isWalking)
    characterModel.current.rotation.y = player.modelRotation;
};

const updateAnimationState = (
  player: PlayerObject,
  animations: Record<string, THREE.AnimationAction | null>
): void => {
  if (player.isWalking && !animations.Walk?.isRunning()) {
    animations.Walk?.play();
  }
  if (!player.isWalking && animations.Walk?.isRunning()) {
    animations.Walk?.stop();
  }
};

/*
 * TODO: implement movement w/o setting velocity to zero
 *
 * This was done with impulse but linear damping was causing
 * player movement to be unresponsive/delayed. This was changed to
 * linear velocity as a temporary fix.
 */
export const movePlayer = (
  player: PlayerObject,
  key: string,
  isKeyDown: boolean
  // frameDelta: number
): void => {
  const { rigidBody, controls, velocity, jumpImpulse, isOnFloor, directions } =
    player;
  if (rigidBody.current) {
    const impulseVector = new THREE.Vector3(0, 0, 0);
    var movementVector = new THREE.Vector3(0, 0, 0);

    const directionMap = {
      [controls.forward.value]: directions.forwardVector,
      [controls.back.value]: directions.backVector,
      [controls.left.value]: directions.leftVector,
      [controls.right.value]: directions.rightVector,
    };

    if (key === controls.jump.value && isKeyDown && isOnFloor) {
      impulseVector.y = jumpImpulse;
      // player.isOnFloor = false;
    } else if (directionMap[key]) {
      const dirVector = directionMap[key];
      const moveKey = getMovementKey(controls, key);

      if (moveKey) controls[moveKey].isPressed = isKeyDown;
      movementVector = isKeyDown
        ? dirVector.clone().multiplyScalar(velocity)
        : movementVector;
    }

    rigidBody.current.setLinvel(movementVector, true);
    rigidBody.current.applyImpulse(impulseVector, true);
  }
};

// Helper function to map `key` value to a control name
const getMovementKey = (
  controls: ControlsObject,
  key: string
): keyof ControlsObject | undefined => {
  return Object.keys(controls).find((k) => controls[k].value === key);
};

export const handleCollisions = (
  player: PlayerObject,
  otherObject: CollisionTarget,
  isCollisionEnter: boolean
) => {
  const { rigidBodyObject } = otherObject;
  if (!rigidBodyObject) return;

  const collisionTargetMap: Record<string, void> = {
    ["floor"]: handleFloorCollision(player, rigidBodyObject, isCollisionEnter),
  };

  collisionTargetMap[rigidBodyObject.name];
};

const handleFloorCollision = (
  player: PlayerObject,
  rigidBodyObject: CollisionTarget["rigidBodyObject"],
  isCollisionEnter: boolean
) => {
  if (rigidBodyObject) {
    player.isOnFloor = isCollisionEnter ? true : false;
  }
};
