import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CollisionGroups, ProjectileProps } from '..';
import {
  CoefficientCombineRule,
  interactionGroups,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier';

export const Projectile = ({
  position,
  direction,
  velocity,
  isFriendly,
  name,
  onExpire,
}: ProjectileProps) => {
  const projectileRigidBody = useRef<RapierRigidBody>(null);
  const projectileModel = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const projectileVector = new THREE.Vector3();
    projectileVector.add(direction);
    projectileVector.normalize().multiplyScalar(velocity);
    projectileRigidBody.current?.setLinvel(projectileVector, true);

    const timeout = setTimeout(() => {
      if (onExpire) onExpire();
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
      collisionGroups={interactionGroups(CollisionGroups.EnemyProjectile, CollisionGroups.Player)}
    >
      <mesh ref={projectileModel}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};
