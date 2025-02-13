import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Camera, DebugPanel, HUD, PauseMenu, World, useGameStore, usePlayerStore } from '../..';

export const Game = () => {
  const { setMouseMovement } = usePlayerStore();
  const { pauseOnPointerLockChange, isPaused, isAntiAliasingEnabled } = useGameStore();

  useEffect(() => {
    window.addEventListener('mousemove', setMouseMovement);
    document.addEventListener('pointerlockchange', pauseOnPointerLockChange);

    return () => {
      window.removeEventListener('mousemove', setMouseMovement);
      document.removeEventListener('pointerlockchange', pauseOnPointerLockChange);
    };
  }, [isPaused]);

  return (
    <>
      <div className="canvas">
        <Canvas gl={{ antialias: isAntiAliasingEnabled }}>
          <DebugPanel />
          <Camera />
          <World />
          <ambientLight color={'white'} intensity={1} />
          <directionalLight position={[0, 10, 0]} />
        </Canvas>
      </div>
      <HUD />
      <PauseMenu />
    </>
  );
};
