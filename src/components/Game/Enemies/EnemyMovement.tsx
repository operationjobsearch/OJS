import { useFrame } from '@react-three/fiber';
import { EnemyProps, usePlayerStore } from '../../..';

export const EnemyMovement = ({ id, rigidBody, type }: EnemyProps) => {
  const playerRb = usePlayerStore((p) => p.rigidBody);

  useFrame(() => {});

  return null;
};
