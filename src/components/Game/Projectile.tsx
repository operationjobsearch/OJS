import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  AttackConfig,
  CollisionGroups,
  ProjectileProps,
  useAttackStore,
  useGameStore,
} from '../..';
import {
  CoefficientCombineRule,
  interactionGroups,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

export const Projectile = ({
  id,
  position,
  direction,
  velocity,
  type,
  isFriendly,
  name,
}: ProjectileProps) => {
  const { isPaused } = useGameStore();
  const { destroyProjectile } = useAttackStore();
  const projectileRigidBody = useRef<RapierRigidBody>(null);
  const projectileModel = useRef<THREE.Mesh>(null);
  const [projectileTimeOut, setProjectileTimeout] = useState<number>(
    AttackConfig[type].projectileTimeout!
  );
  const [initialTime, setInitialTime] = useState<number>(Date.now());

  useEffect(() => {
    const projectileVector = new THREE.Vector3();
    projectileVector.add(direction);
    projectileVector.normalize().multiplyScalar(velocity);
    projectileRigidBody.current?.setLinvel(projectileVector, true);
  }, []);

  useEffect(() => {
    console.log('initialTime', initialTime);
    const destroyTimer = setTimeout(() => {
      if (!isPaused) destroyProjectile(id);
    }, projectileTimeOut);

    if (isPaused) {
      setProjectileTimeout(Date.now() - initialTime);
      console.log('math', Date.now() - initialTime);
    }

    return () => clearTimeout(destroyTimer);
  }, [isPaused]);

  useEffect(() => {
    console.log('projectileTimeOut', projectileTimeOut);
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
      // TODO: update to dynamically set group based on isFriendly or attack type
      // if player projectiles are added, do the same with collision callback
      collisionGroups={interactionGroups(CollisionGroups.EnemyProjectile, CollisionGroups.Player)}
      onCollisionEnter={(o) => {
        if (o.colliderObject?.name === 'player') destroyProjectile(id);
      }}
    >
      {/* TODO: also set projectile appearance based on attack type */}
      <mesh ref={projectileModel}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};
