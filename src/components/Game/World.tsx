import {
  Player,
  useGameStore,
  EnemyManager,
  AttackManager,
  StageManager,
  LoadingScreen,
} from '../..';
import { Suspense } from 'react';
import { Physics } from '@react-three/rapier';

export const World = () => {
  const { fpsLimit, isDebugEnabled, isPaused } = useGameStore();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Physics debug={isDebugEnabled} timeStep={1 / fpsLimit} paused={isPaused}>
        <StageManager />
        <EnemyManager />
        <AttackManager />
        <Player />
      </Physics>
      {/* TODO: remove below line when done making style changes and testing loading screen */}
      {/* <LoadingScreen /> */}
    </Suspense>
  );
};
