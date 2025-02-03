import { Camera, DebugPanel, World, useGameStore, usePlayerStore } from '.';
import { Key, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

export const App = () => {
  const { setMouseMovement } = usePlayerStore();
  const { setBlur, setPointerLockChange, setPaused, isPaused } = useGameStore();

  const togglePause = (e: KeyboardEvent) => {
    if (e.key == 'Escape') {
      console.log('isPaused:', isPaused);
      setPaused(!isPaused);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', setMouseMovement);
    document.addEventListener('pointerlockchange', setPointerLockChange);
    window.addEventListener('keydown', togglePause);

    return () => {
      window.removeEventListener('blur', setBlur);
      window.removeEventListener('mousemove', setMouseMovement);
      document.removeEventListener('pointerlockchange', setPointerLockChange);
      window.removeEventListener('keydown', togglePause);
    };
  }, [isPaused]);

  return (
    <div className="canvas" onClick={() => document.body.requestPointerLock()}>
      <Canvas>
        <DebugPanel />
        <Camera />
        <World />
        <ambientLight />
      </Canvas>
    </div>
  );
};
