import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { EnemyProps, useEnemyStore } from '../../..';

export const EnemyHealth = ({ id, rigidBody }: EnemyProps) => {
  const { camera } = useThree();
  const healthBarRef = useRef<THREE.Mesh>(null);
  const enemy = useEnemyStore((state) => state.enemies.find((e) => e.id === id));

  useFrame(() => {
    if (!enemy || !rigidBody?.current || !healthBarRef.current) return;
    if (!(healthBarRef.current.material instanceof THREE.MeshBasicMaterial)) return;

    const enemyPosition = rigidBody.current.translation();
    healthBarRef.current.position.set(enemyPosition.x, enemyPosition.y + 0.75, enemyPosition.z);
    healthBarRef.current.lookAt(camera.position);

    const healthPercentage = enemy.health / 100;
    healthBarRef.current.scale.x = healthPercentage;
    healthBarRef.current.material.color.set(
      healthPercentage > 0.75 ? 'green' : healthPercentage > 0.5 ? 'yellow' : 'red'
    );
  });

  return (
    <mesh ref={healthBarRef}>
      <planeGeometry args={[1, 0.1]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
};
