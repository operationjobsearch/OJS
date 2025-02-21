import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import {
  EnemyProps,
  useEnemyStore,
  EnemyMovement,
  EnemyCombat,
  EnemyAnimation,
  EnemyHealth,
  EnemyTypes,
  CollisionGroups,
} from '../../..';
import { interactionGroups, RapierRigidBody, RigidBody } from '@react-three/rapier';

export const Enemy: React.FC<EnemyProps> = (props) => {
  const { id, position, rigidBody } = props;
  const { setEnemyRb } = useEnemyStore();
  const rb = useRef<RapierRigidBody>(null);

  useEffect(() => {
    setEnemyRb(id, rb);
    if (rb.current) rb.current.userData = { enemyId: id };
  }, []);

  return (
    <>
      <RigidBody
        ref={rb}
        lockRotations={true}
        colliders="cuboid"
        name="enemy"
        position={position}
        collisionGroups={interactionGroups(CollisionGroups.Enemy, [
          CollisionGroups.Player,
          CollisionGroups.PlayerProjectile,
        ])}
      >
        <EnemyAnimation {...props} />
      </RigidBody>
      <EnemyMovement {...props} />
      <EnemyCombat {...props} />
      <EnemyHealth {...props} />
    </>
  );
};
