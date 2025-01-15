import * as THREE from "three";
import { PlayerObject, ControlsObject, MovementVectorObject } from "../..";
import { CollisionTarget, RapierRigidBody } from "@react-three/rapier";

export const updateWalkingState = (controls: ControlsObject): boolean => {
  return ["forward", "left", "back", "right"].some(
    (key) => controls[key].isPressed
  );
};

export const updateModelRotation = (
  characterModel: React.RefObject<THREE.Object3D> | null,
  modelRotation: number,
  isWalking: boolean,
  cameraAngleTheta: number
): number => {
  modelRotation = Math.PI + cameraAngleTheta;

  if (characterModel && characterModel.current && isWalking)
    characterModel.current.rotation.y = modelRotation;

  return modelRotation;
};

export const updateDirectionVectors = (
  directions: PlayerObject["directions"],
  camera: THREE.Camera
): void => {
  const { forwardVector, leftVector, rightVector, backVector } = directions;

  camera.getWorldDirection(forwardVector);
  forwardVector.y = 0;

  rightVector.crossVectors(forwardVector, camera.up).normalize();
  leftVector.copy(rightVector).negate();
  backVector.copy(forwardVector).negate();
};

export const updateAnimationState = (
  isWalking: boolean,
  animations: Record<string, THREE.AnimationAction | null>,
  frameTime: number
): void => {
  if (isWalking && !animations.Walk?.isRunning()) {
    animations.Walk?.play();
  }
  if (!isWalking && animations.Walk?.isRunning()) {
    animations.Walk?.stop();
  }
};

export const updateVelocity = (
  rigidBody: React.RefObject<RapierRigidBody> | null,
  controls: ControlsObject,
  velocity: number,
  jumpVelocity: number,
  isOnFloor: boolean,
  directions: MovementVectorObject,
  frameTime: number
): void => {
  if (!rigidBody || !rigidBody.current) return;

  const movementVector = new THREE.Vector3();

  // Add directions for keys that are pressed
  if (controls.forward.isPressed) movementVector.add(directions.forwardVector);
  if (controls.back.isPressed) movementVector.add(directions.backVector);
  if (controls.left.isPressed) movementVector.add(directions.leftVector);
  if (controls.right.isPressed) movementVector.add(directions.rightVector);

  // Normalize for consistent speed if there is any movement
  if (movementVector.length() > 0) {
    movementVector.normalize().multiplyScalar(velocity * frameTime);
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

export const handleCollision = (
  isOnFloor: boolean,
  otherObject: CollisionTarget,
  isCollisionEnter: boolean
) => {
  const { rigidBodyObject } = otherObject;
  if (!rigidBodyObject) return;

  const collisionTargetMap: Record<string, void> = {
    ["floor"]: handleFloorCollision(
      isOnFloor,
      rigidBodyObject,
      isCollisionEnter
    ),
  };

  collisionTargetMap[rigidBodyObject.name];
};

const handleFloorCollision = (
  isOnFloor: boolean,
  rigidBodyObject: CollisionTarget["rigidBodyObject"],
  isCollisionEnter: boolean
) => {
  if (rigidBodyObject) {
    isOnFloor = isCollisionEnter ? true : false;
  }
};

export const handleKeyEvent = (controls: ControlsObject, e: KeyboardEvent) => {
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
