import * as THREE from "three";
import { PlayerObject, ControlsObject, GameObject } from "../..";
import { CollisionTarget } from "@react-three/rapier";

export const updatePlayerState = (
  game: GameObject,
  player: PlayerObject,
  camera: THREE.Camera,
  animations: Record<string, THREE.AnimationAction | null>,
  delta: number
): void => {
  updateWalkingState(player);
  updateModelRotation(player, game);
  updateDirectionVectors(player, camera);
  updateAnimationState(player, animations, delta);
  updateVelocity(player, delta);
};

const updateWalkingState = (player: PlayerObject): void => {
  const { controls } = player;

  player.isWalking =
    controls.forward.isPressed ||
    controls.left.isPressed ||
    controls.back.isPressed ||
    controls.right.isPressed;
};

const updateModelRotation = (player: PlayerObject, game: GameObject): void => {
  const { characterModel, isWalking } = player;
  const { cameraAngleTheta } = game;

  player.modelRotation = Math.PI + cameraAngleTheta;
  if (characterModel.current && isWalking)
    characterModel.current.rotation.y = player.modelRotation;
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

const updateAnimationState = (
  player: PlayerObject,
  animations: Record<string, THREE.AnimationAction | null>,
  delta: number
): void => {
  if (player.isWalking && !animations.Walk?.isRunning()) {
    animations.Walk?.play();
  }
  if (!player.isWalking && animations.Walk?.isRunning()) {
    animations.Walk?.stop();
  }
};

const updateVelocity = (player: PlayerObject, delta: number): void => {
  const { rigidBody, controls, velocity, jumpVelocity, isOnFloor, directions } =
    player;

  if (!rigidBody.current) return;

  const movementVector = new THREE.Vector3();

  // Add directions for keys that are pressed
  if (controls.forward.isPressed) movementVector.add(directions.forwardVector);
  if (controls.back.isPressed) movementVector.add(directions.backVector);
  if (controls.left.isPressed) movementVector.add(directions.leftVector);
  if (controls.right.isPressed) movementVector.add(directions.rightVector);

  // Normalize for consistent speed if there is any movement
  if (movementVector.length() > 0) {
    movementVector.normalize().multiplyScalar(velocity);
  }

  // Handle jumping separately
  const currentVelocity = rigidBody.current.linvel();
  const newVerticalVelocity =
    controls.jump.isPressed && isOnFloor ? jumpVelocity : currentVelocity.y;

  // Set the new velocity
  rigidBody.current.setLinvel(
    { x: movementVector.x, y: newVerticalVelocity, z: movementVector.z },
    true
  );
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

export const handleKeyEvent = (player: PlayerObject, e: KeyboardEvent) => {
  const { controls } = player;
  const movementInputMap: Record<string, keyof ControlsObject> = {
    [controls.forward.value]: "forward",
    [controls.back.value]: "back",
    [controls.left.value]: "left",
    [controls.right.value]: "right",
    [controls.jump.value]: "jump",
  };

  const controlKey = movementInputMap[e.key];
  if (controlKey) {
    const control = controls[controlKey];
    control.isPressed = e.type === "keydown" ? true : false;
  }
};
