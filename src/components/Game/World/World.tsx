import {
  Player,
  useGameStore,
  EnemyManager,
  StageManager,
  LoadingScreen,
  Projectiles,
} from '../../..';
import { Suspense, useEffect } from 'react';
import { Physics } from '@react-three/rapier';

export const World = () => {
  const { fpsTarget, isDebugEnabled, isPaused, setFpsTarget } = useGameStore();

  const estimateRefreshRate = async (): Promise<number> => {
    return new Promise((resolve) => {
      let frameCount = 0;
      let startTime = performance.now();

      const measure = () => {
        frameCount++;
        const elapsed = performance.now() - startTime;

        if (elapsed < 1000) {
          requestAnimationFrame(measure);
        } else {
          const estimatedFPS = Math.round(frameCount / (elapsed / 1000));
          resolve(estimatedFPS);
        }
      };

      requestAnimationFrame(measure);
    });
  };

  const getAccurateRefreshRate = async (): Promise<number> => {
    const results = [];
    for (let i = 0; i < 3; i++) {
      results.push(await estimateRefreshRate());
    }

    return Math.max(...results);
  };

  useEffect(() => {
    getAccurateRefreshRate().then((refreshRate) => {
      const clampedRefreshRate = Math.max(refreshRate, 60); // Ensure at least 60Hz
      const timestep = 1 / clampedRefreshRate;

      console.log(`Detected Refresh Rate: ${refreshRate} Hz, Using Timestep: ${timestep}`);
      setFpsTarget(clampedRefreshRate + 60);
    });
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Physics debug={isDebugEnabled} timeStep={1 / fpsTarget} paused={isPaused} interpolate={true}>
        <StageManager />
        <EnemyManager />
        <Player />
        <Projectiles />
      </Physics>
    </Suspense>
  );
};
