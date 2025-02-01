import * as THREE from "three";
import { create } from "zustand";
import {
  PlayerObject,
  updateAnimationState,
  updateDirectionVectors,
  updateVelocity,
  updateWalkingState,
} from "..";

export const usePlayerStore = create<PlayerObject>()((set, get) => ({
  // Refs
  rigidBody: null,
  characterModel: null,
  reticle: null,
  mouseMovement: { x: 0, y: 0 },

  // State
  isFiringPrimary: false,
  isChargingSecondary: false,
  shouldFireSecondary: false,
  isWalking: false,
  isRunning: false,
  isOnFloor: true,
  canMove: true,
  modelRotation: Math.PI,
  lastAttack: 0,
  playerColliderRadius: 1,

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
  jumpVelocity: 7,
  health: 100,
  attackSpeed: 3,
  chargeStartTime: 0,
  projectileVelocity: 30,
  projectileDamage: 5,

  setRigidBody: (rigidBody) => set({ rigidBody }),
  setCharacterModel: (characterModel) => set({ characterModel }),
  setReticle: (reticle) => set({ reticle }),
  setMouseMovement: (e) => {
    if (document.pointerLockElement)
      set({ mouseMovement: { x: e.movementX, y: e.movementY } });
  },

  setIsFiringPrimary: (isFiring) => set({ isFiringPrimary: isFiring }),
  setLastAttack: (timeStamp) => set({ lastAttack: timeStamp }),
  setIsChargingSecondary: (isCharging) =>
    set({ isChargingSecondary: isCharging }),
  setChargeStartTime: (timeStamp) => set({ chargeStartTime: timeStamp }),
  setShouldFireSecondary: (shouldFire) =>
    set({ shouldFireSecondary: shouldFire }),
  setIsWalking: (controls) =>
    set(() => ({
      isWalking: updateWalkingState(controls),
    })),

  setModelRotation: (θ) => {
    set({
      modelRotation: Math.PI + θ,
    });
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
