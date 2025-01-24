import * as THREE from "three";
import { create } from "zustand";
import {
  PlayerObject,
  updateAnimationState,
  updateDirectionVectors,
  updateModelRotation,
  updateVelocity,
  updateWalkingState,
} from "../..";

export const usePlayerStore = create<PlayerObject>()((set, get) => ({
  // Refs
  rigidBody: null,
  characterModel: null,
  reticle: null,
  mouseMovement: { x: 0, y: 0 },

  // State
  isFiring: false,
  isWalking: false,
  isRunning: false,
  isOnFloor: true,
  canMove: true,
  modelRotation: Math.PI,
  lastProjectile: 0,
  playerColliderRadius: 0.5,

  controls: {
    forward: { value: "w", isPressed: false },
    left: { value: "a", isPressed: false },
    back: { value: "s", isPressed: false },
    right: { value: "d", isPressed: false },
    jump: { value: " ", isPressed: false },
  },
  directions: {
    forwardVector: new THREE.Vector3(),
    leftVector: new THREE.Vector3(),
    backVector: new THREE.Vector3(),
    rightVector: new THREE.Vector3(),
  },

  // Stats
  velocity: 500,
  runMultiplier: 1.5,
  jumpVelocity: 10,
  health: 100,
  attackSpeed: 5,
  projectileVelocity: 10,
  projectileDamage: 5,

  setRigidBody: (rigidBody) => set({ rigidBody }),
  setCharacterModel: (characterModel) => set({ characterModel }),
  setReticle: (reticle) => set({ reticle }),
  setMouseMovement: (e) => {
    if (document.pointerLockElement)
      set({ mouseMovement: { x: e.movementX, y: e.movementY } });
  },

  setIsFiring: (isMouseDown) => set({ isFiring: isMouseDown }),
  setLastProjectile: (timeStamp) => set({ lastProjectile: timeStamp }),
  setIsWalking: (controls) =>
    set(() => ({
      isWalking: updateWalkingState(controls),
    })),

  setModelRotation: (θ) => {
    const { characterModel, modelRotation, isWalking } = get();
    set(() => ({
      modelRotation: updateModelRotation(
        characterModel,
        modelRotation,
        isWalking,
        θ
      ),
    }));
  },
  setDirectionVectors: (camera) => {
    const { directions } = get();
    updateDirectionVectors(directions, camera);
  },
  setVelocity: (frameTime) => {
    const {
      rigidBody,
      controls,
      velocity,
      jumpVelocity,
      isOnFloor,
      directions,
    } = get();

    updateVelocity(
      rigidBody,
      controls,
      velocity,
      jumpVelocity,
      isOnFloor,
      directions,
      frameTime
    );
  },
  setAnimationState: (animations, frameTime) => {
    const { isWalking } = get();
    updateAnimationState(isWalking, animations, frameTime);
  },

  handleCollisions: (otherObject, isCollisionEnter) => {
    const { handleFloorCollision } = get();
    const { rigidBodyObject } = otherObject;
    if (!rigidBodyObject) return;

    const collisionTargetMap: Record<string, void> = {
      ["floor"]: handleFloorCollision(rigidBodyObject, isCollisionEnter),
    };
    collisionTargetMap[rigidBodyObject.name];
  },
  handleFloorCollision: (rigidBodyObject, isCollisionEnter) => {
    if (rigidBodyObject) set(() => ({ isOnFloor: isCollisionEnter }));
  },
}));
