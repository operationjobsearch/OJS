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
  chargeMultiplier?: number;
}

export interface AttackFactory {
  projectiles: ProjectileProps[];
  projectileOffset: number;
  projectileVerticalOffset: number;
  projectileVelocity: number;
  spawnProjectile: (newProjectile: ProjectileProps) => void;
  destroyProjectile: (id: string) => void;
}

export interface ProjectileProps {
  id: string;
  position: THREE.Vector3;
  direction: THREE.Vector3;
  velocity: number;
  isFriendly: boolean;
  name: string;
  onExpire?: CallableFunction;
}
//#endregion
