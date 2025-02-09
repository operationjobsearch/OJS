import * as THREE from 'three';
import { CollisionTarget, RapierRigidBody } from '@react-three/rapier';
import { AttackTypes } from '..';

//#region Enemy
export enum EnemyTypes {
  JobPosting = 'JobPosting',
  GhostJob = 'GhostJob',
}

export interface EnemyFactory {
  enemies: EnemyProps[];
  spawnEnemy: (newEnemy: EnemyProps) => void;
  damageEnemy: (id: string, damage: number) => void;
  setEnemyRb: (id: string, rb: React.RefObject<RapierRigidBody>) => void;
  attack: (type: EnemyTypes) => void;
  handleCollisions: (id: string, otherObject: CollisionTarget, isCollisionEnter: boolean) => void;
  resetEnemies: () => void;
}

export interface EnemyProps {
  id: string;
  type: EnemyTypes;
  attackType: AttackTypes;
  position: THREE.Vector3;
  rigidBody: React.RefObject<RapierRigidBody> | null;

  health: number;
  attackSpeed: number;
}
//#endregion
