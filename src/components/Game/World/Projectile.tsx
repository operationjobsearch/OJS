import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  AttackConfig,
  CollisionGroups,
  ProjectileProps,
  useEnemyStore,
  useGameStore,
} from '../../..';
import {
  CoefficientCombineRule,
  interactionGroups,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier';

export const Projectile = ({
  id,
  position,
  direction,
  velocity,
  type,
  isFriendly,
  name,
  damage,
}: ProjectileProps) => {
  const { damageEnemy } = useEnemyStore();
  const { isPaused, destroyProjectile } = useGameStore();
  const projectileRigidBody = useRef<RapierRigidBody>(null);
  const projectileModel = useRef<THREE.Mesh>(null);
  const [projectileTimeOut, setProjectileTimeout] = useState<number>(
    AttackConfig[type].projectileTimeout!
  );
  const [initialTime, setInitialTime] = useState<number>(Date.now());

  const collisionGroups = isFriendly
    ? interactionGroups(CollisionGroups.PlayerProjectile, CollisionGroups.Enemy)
    : interactionGroups(CollisionGroups.EnemyProjectile, CollisionGroups.Player);

  const projectileAppearance = isFriendly
    ? { color: 'white', scale: [0.15, 0.15, 0.15] } // Player projectile
    : { color: 'red', scale: [0.1, 0.1, 0.1] }; // Enemy projectile

  const handleCollision = (o: any) => {
    if (isFriendly) {
      if (o.colliderObject.name === 'enemy') {
        const parentRigidBody = o.collider.parent();
        const enemyId: string = parentRigidBody.userData.enemyId;

        damageEnemy(enemyId, damage);
        destroyProjectile(id);
      }
    } else {
      if (o.colliderObject?.name === 'player') destroyProjectile(id);
    }
  };

  useEffect(() => {
    const projectileVector = new THREE.Vector3();
    projectileVector.add(direction);
    projectileVector.normalize().multiplyScalar(velocity);
    projectileRigidBody.current?.setLinvel(projectileVector, true);
  }, []);

  useEffect(() => {
    // console.log('initialTime', initialTime);
    const destroyTimer = setTimeout(() => {
      if (!isPaused) destroyProjectile(id);
    }, projectileTimeOut);

    if (isPaused) {
      setProjectileTimeout(Date.now() - initialTime);
      // console.log('math', Date.now() - initialTime);
    }

    return () => clearTimeout(destroyTimer);
  }, [isPaused]);

  useEffect(() => {
    // console.log('projectileTimeOut', projectileTimeOut);
  }, [projectileTimeOut]);

  return (
    <RigidBody
      ref={projectileRigidBody}
      colliders="ball"
      lockRotations={true}
      gravityScale={0}
      restitution={0}
      restitutionCombineRule={CoefficientCombineRule.Min}
      position={position}
      name={name}
      collisionGroups={collisionGroups}
      onCollisionEnter={handleCollision}
    >
      <mesh ref={projectileModel}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={projectileAppearance.color} />
      </mesh>
    </RigidBody>
  );
};
