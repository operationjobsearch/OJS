import { Player, useGameStore, EnemyManager, AttackManager, StageManager } from '..';
import { Suspense } from 'react';
import { Physics } from '@react-three/rapier';

export const World = () => {
  const { fpsLimit, isDebugEnabled, isPaused } = useGameStore();

  return (
    <Suspense>
      <Physics debug={isDebugEnabled} timeStep={'vary'} paused={isPaused}>
        <StageManager />
        <EnemyManager />
        <AttackManager />
        <Player />
      </Physics>
    </Suspense>
  );
};
