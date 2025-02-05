import { Player, useGameStore, EnemyManager, AttackManager } from '..';
import { Suspense } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import { Box } from '@react-three/drei';

export const World = () => {
  const { isDebugEnabled, isPaused } = useGameStore();

  return (
    <Suspense>
      <Physics debug={isDebugEnabled} timeStep={'vary'} paused={isPaused}>
        <Player />
        <EnemyManager />
        <AttackManager />
        <RigidBody colliders="cuboid" type="fixed" name="floor" friction={0}>
          <Box position={[0, 0, 0]} args={[100, 0, 100]}>
            <meshStandardMaterial color="blue" />
          </Box>
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
