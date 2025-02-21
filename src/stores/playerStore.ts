import * as THREE from 'three';
import { create } from 'zustand';
import { AttackConfig, AttackTypes, PlayerObject } from '..';
//#region PlayerStore
export const usePlayerStore = create<PlayerObject>()((set, get) => ({
  // Refs
  rigidBody: null,
  characterModel: null,
  animationActions: {},

  // State
  isMoving: false,
  isFiringPrimary: false,
  isChargingSecondary: false,
  shouldFireSecondary: false,
  isOnFloor: true,
  modelRotation: Math.PI,
  lastAttack: 0,
  playerColliderRadius: 1,
  aimDirection: new THREE.Vector3(),

  directions: {
    forwardVector: new THREE.Vector3(),
    leftVector: new THREE.Vector3(),
    backVector: new THREE.Vector3(),
    rightVector: new THREE.Vector3(),
  },

  // Stats
  moveSpeed: 20,
  runMultiplier: 1.5,
  jumpVelocity: 7,
  health: 100,
  attackSpeed: 3,
  chargeStartTime: 0,
  projectileVelocity: 30,
  projectileDamage: 5,

  setRigidBody: (rigidBody) => set({ rigidBody }),
  setCharacterModel: (characterModel) => set({ characterModel }),
  setAnimations: (animations) => set({ animationActions: animations }),

  setModelRotation: (Θ) => set({ modelRotation: Θ }),
  setIsFiringPrimary: (isFiring) => set({ isFiringPrimary: isFiring }),
  setLastAttack: (timeStamp) => set({ lastAttack: timeStamp }),
  setIsChargingSecondary: (isCharging) => set({ isChargingSecondary: isCharging }),
  setChargeStartTime: (timeStamp) => set({ chargeStartTime: timeStamp }),
  setShouldFireSecondary: (shouldFire) => set({ shouldFireSecondary: shouldFire }),
  setAimDirection: (direction) => set({ aimDirection: direction }),
  setIsMoving: (moving) => set({ isMoving: moving }),
  setDirectionVectors: (camera) => {
    const { directions } = get();
    const { forwardVector, leftVector, rightVector, backVector } = directions;

    camera.getWorldDirection(forwardVector);
    forwardVector.y = 0;

    rightVector.crossVectors(forwardVector, camera.up).normalize();
    leftVector.copy(rightVector).negate();
    backVector.copy(forwardVector).negate();
  },

  handleCollisions: (otherObject, isCollisionEnter) => {
    const { handleFloorCollision, handleProjectileCollision } = get();
    const { rigidBodyObject } = otherObject;
    if (!rigidBodyObject) return;

    const collisionTargetMap: Record<string, void> = {
      ['floor']: handleFloorCollision(rigidBodyObject, isCollisionEnter),
      [AttackTypes.JobPostingAtk]: handleProjectileCollision(rigidBodyObject, isCollisionEnter),
      [AttackTypes.GhostJobAtk]: handleProjectileCollision(rigidBodyObject, isCollisionEnter),
    };
    collisionTargetMap[rigidBodyObject.name];
  },
  handleFloorCollision: (rigidBodyObject, isCollisionEnter) => {
    if (rigidBodyObject) set(() => ({ isOnFloor: isCollisionEnter }));
  },
  handleProjectileCollision: (otherObject, isCollisionEnter) => {
    if (!isCollisionEnter) return;

    const { health } = get();
    // console.log('projectile that hit: ', otherObject);
    // console.log('player hit');

    let damage = 0;
    switch (otherObject?.name) {
      case AttackTypes.JobPostingAtk:
        damage = AttackConfig[AttackTypes.JobPostingAtk].baseDamage;
        break;
      case AttackTypes.GhostJobAtk:
        damage = AttackConfig[AttackTypes.GhostJobAtk].baseDamage;
        break;
    }

    // console.log('hp', health);
    const newHealth = health - damage;
    set({ health: newHealth });
  },

  setPlayer: (newState) => set((state) => ({ ...state, ...newState })),
}));
//#endregion

//#region Helpers

//#endregion
