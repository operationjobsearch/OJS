import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { usePlayerStore, useGameStore } from '../../..';

export const PlayerCamera = () => {
  const { camera } = useThree();
  const { isPaused } = useGameStore();
  const { cameraHorizontalOffset, cameraVerticalOffset, cameraAngle } = useGameStore();
  const { rigidBody, setDirectionVectors } = usePlayerStore();

  const smoothedCameraPos = useRef(new THREE.Vector3());
  const smoothedLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    const initialCameraPos = new THREE.Vector3(
      0 + cameraHorizontalOffset * Math.cos(cameraAngle),
      cameraVerticalOffset,
      0 + cameraHorizontalOffset * Math.sin(cameraAngle)
    );

    smoothedCameraPos.current.copy(initialCameraPos);
    camera.position.copy(smoothedCameraPos.current);
    camera.lookAt(0, 0, 0);
  }, []);

  useFrame((_, delta) => {
    if (isPaused || !rigidBody || !rigidBody.current) return;

    setDirectionVectors(camera);
    const playerPos = rigidBody.current.translation();
    const targetCameraPos = new THREE.Vector3(
      playerPos.x + cameraHorizontalOffset * Math.cos(cameraAngle),
      playerPos.y + cameraVerticalOffset,
      playerPos.z + cameraHorizontalOffset * Math.sin(cameraAngle)
    );

    const lookAtPos = new THREE.Vector3(playerPos.x, playerPos.y, playerPos.z);
    const lerpFactor = 1 - Math.exp(-delta * 10);

    smoothedCameraPos.current.lerp(targetCameraPos, lerpFactor);
    smoothedLookAt.current.lerp(lookAtPos, lerpFactor);

    camera.position.copy(smoothedCameraPos.current);
    camera.lookAt(smoothedLookAt.current);
  });

  return null;
};
