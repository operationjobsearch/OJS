import * as THREE from "three";

export enum AttackTypes {
  Primary = "Resume",
  Secondary = "TailoredResume",
  Enemy1 = "RejectionLetter",
}

export interface AttackStats {
  type: AttackTypes;
  baseDamage: number;
  chargeMultiplier?: number;
}

export interface AttackFactory {
  projectiles: ProjectileProps[];
  spawnProjectile: (newProjectile: ProjectileProps) => void;
  destroyProjectile: (id: number) => void;
}

export const AttackConfig: Record<AttackTypes, AttackStats> = {
  [AttackTypes.Primary]: {
    type: AttackTypes.Primary,
    baseDamage: 10,
  },
  [AttackTypes.Secondary]: {
    type: AttackTypes.Secondary,
    baseDamage: 50,
    chargeMultiplier: 3,
  },
  [AttackTypes.Enemy1]: {
    type: AttackTypes.Enemy1,
    baseDamage: 20,
  },
};

export interface ProjectileProps {
  id: number;
  position: THREE.Vector3;
  direction: THREE.Vector3;
  velocity: number;
  isFriendly: boolean;
  onExpire?: CallableFunction;
}
