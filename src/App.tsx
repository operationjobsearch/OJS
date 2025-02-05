import { Camera, DebugPanel, World, useGameStore, usePlayerStore } from '.';
import { Key, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

export const App = () => {
  const { setMouseMovement } = usePlayerStore();
  const { pauseOnPointerLockChange, isPaused } = useGameStore();

  useEffect(() => {
    window.addEventListener('mousemove', setMouseMovement);
    document.addEventListener('pointerlockchange', pauseOnPointerLockChange);

    return () => {
      window.removeEventListener('mousemove', setMouseMovement);
      document.removeEventListener('pointerlockchange', pauseOnPointerLockChange);
    };
  }, [isPaused]);

  return (
    <div
      className="canvas"
      onClick={() => document.body.requestPointerLock({ unadjustedMovement: true })}
    >
      <Canvas>
        <DebugPanel />
        <Camera />
        <World />
        <ambientLight />
      </Canvas>
    </div>
  );
};
