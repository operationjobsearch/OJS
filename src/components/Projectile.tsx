import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ProjectileProps } from '..';
import { CoefficientCombineRule, RapierRigidBody, RigidBody } from '@react-three/rapier';

export const Projectile = ({
  position,
  direction,
  velocity,
  isFriendly,
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
      name="resume"
    >
      <mesh ref={projectileModel}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};
