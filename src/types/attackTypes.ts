import * as THREE from 'three';

//#region Attack
export enum AttackTypes {
  // Player
  Primary = 'Resume',
  Secondary = 'TailoredResume',

  // Enemy
  JobPostingAtk = 'RejectionLetter',
  GhostJobAtk = 'IndefiniteWait',
}

export interface AttackStats {
  type: AttackTypes;
  baseDamage: number;

  // for charged attacks
  chargeMultiplier?: number;

  // for projectiles
  projectileTimeout: number;
  velocity: number;
  spawnOffset: number;
  verticalOffset: number;
}

export interface AttackFactory {
  projectiles: ProjectileProps[];
  spawnProjectile: (newProjectile: ProjectileProps) => void;
  destroyProjectile: (id: string) => void;
}

export interface ProjectileProps {
  id: string;
  position: THREE.Vector3;
  direction: THREE.Vector3;
  velocity: number;
  name: string;
  type: AttackTypes;
  damage: number;

  isFriendly: boolean;
}
//#endregion
