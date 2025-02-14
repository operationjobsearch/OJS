import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CollisionGroups, ProjectileProps, useAttackStore } from '../..';
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
  isFriendly,
  name,
}: ProjectileProps) => {
  const { destroyProjectile } = useAttackStore();
  const projectileRigidBody = useRef<RapierRigidBody>(null);
  const projectileModel = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const projectileVector = new THREE.Vector3();
    projectileVector.add(direction);
    projectileVector.normalize().multiplyScalar(velocity);
    projectileRigidBody.current?.setLinvel(projectileVector, true);

    const timeout = setTimeout(() => {
      destroyProjectile(id);
      // TODO: delay auto expire of projectiles when paused
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

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
      <mesh ref={projectileModel}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};
