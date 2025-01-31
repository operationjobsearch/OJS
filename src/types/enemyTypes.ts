import * as THREE from "three";
import { CollisionTarget, RapierRigidBody } from "@react-three/rapier";

export enum EnemyTypes {
  JobPosting,
  GhostJob,
}

export interface EnemyFactory {
  enemies: EnemyProps[];
  spawnEnemy: (newEnemy: EnemyProps) => void;
  destroyEnemy: (id: number) => void;
  damageEnemy: (id: number, damage: number) => void;
  setEnemyRb: (id: number, rb: React.RefObject<RapierRigidBody>) => void;
  attack: (type: EnemyTypes) => void;
  handleCollisions: (
    id: number,
    otherObject: CollisionTarget,
    isCollisionEnter: boolean
  ) => void;
}

export interface EnemyProps {
  id: number;
  type: EnemyTypes;
  attackSpeed: number;
  health: number;
  rigidBody: React.RefObject<RapierRigidBody> | null;
  position: THREE.Vector3;
  onExpire?: CallableFunction;

  lastAttack: number;
}
