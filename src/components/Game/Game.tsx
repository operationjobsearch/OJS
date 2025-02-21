import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Debug, HUD, PauseMenu, World, useGameStore } from '../..';

export const Game = () => {
  const { isPaused, isAntiAliasingEnabled, pixelRatio, setPaused } = useGameStore();

  const pause = () => setPaused(true);
  const togglePause = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setPaused(!isPaused);
  };

  useEffect(() => {
    document.addEventListener('keydown', togglePause);
    document.addEventListener('blur', pause);

    return () => {
      document.removeEventListener('keydown', togglePause);
      document.removeEventListener('blur', pause);
    };
  }, [isPaused]);

  return (
    <>
      <div className="canvas">
        <Canvas gl={{ antialias: isAntiAliasingEnabled, pixelRatio: pixelRatio }}>
          <Debug />
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
