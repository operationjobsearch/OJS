import { useEffect } from 'react';
import { useGameStore } from '../..';
import { useFrame, useThree } from '@react-three/fiber';

export const Debug = () => {
  const { gl } = useThree();
  const { stats, isPaused } = useGameStore();

  useEffect(() => {
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
  }, []);

  useFrame(() => {
    stats.begin();
    if (!isPaused) {
      // console.log('Number of Triangles :', gl.info.render.triangles);
    }
    stats.end();
  });

  return null;
};
