import * as THREE from 'three';
import { RapierRigidBody } from '@react-three/rapier';
import { AttackTypes } from '..';

//#region Enemy
export enum EnemyTypes {
  JobPosting = 'JobPosting',
  GhostJob = 'GhostJob',
}

export interface EnemyFactory {
  enemies: EnemyProps[];

  setEnemyRb: (id: string, rb: React.RefObject<RapierRigidBody>) => void;
  spawnEnemy: (newEnemy: EnemyProps) => void;
  damageEnemy: (id: string, damage: number) => void;
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
