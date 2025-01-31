import * as THREE from "three";
import { EnemyProps, EnemyTypes } from "..";

// TODO: handle avoiding occupied space for spawn locations
export const createEnemy = (type: EnemyTypes): EnemyProps => {
  const id = Date.now();
  const posX = Math.random() * 20 - 10;
  const posZ = Math.random() * 20 - 10;

  // const enemy = new THREE.Group();
  // enemy.userData.enemyId = id;

  return {
    id: id,
    type: type,
    health: 100,
    position: new THREE.Vector3(posX, 1, posZ),
    rigidBody: null,
    lastAttack: 0,
    attackSpeed: 2,
  };
};
