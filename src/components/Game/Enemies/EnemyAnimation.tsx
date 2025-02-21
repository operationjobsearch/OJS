import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { EnemyProps, useEnemyStore } from '../../..';

export const EnemyAnimation = ({ id }: EnemyProps) => {
  const { scene } = useGLTF('./hamburger.glb');
  const enemyModel = useRef(scene.clone());
  const hitTimer = useRef(0);
  const originalEmissiveColors = useRef(new Map());

  const enemy = useEnemyStore((state) => state.enemies.find((e) => e.id === id));

  useEffect(() => {
    enemyModel.current.traverse((m) => {
      if (m instanceof THREE.Mesh && m.material instanceof THREE.MeshStandardMaterial) {
        originalEmissiveColors.current.set(m, m.material.emissive.clone());
      }
    });
  }, []);

  useEffect(() => {
    if (!enemy) return;
    hitTimer.current = 0.2;
  }, [enemy?.health]);

  return (
    <primitive ref={enemyModel} object={enemyModel.current} scale={0.1} rotation-y={Math.PI} />
  );
};
