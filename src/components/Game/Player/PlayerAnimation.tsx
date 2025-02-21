import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { usePlayerStore } from '../../..';

export const PlayerAnimation = () => {
  const { rigidBody, modelRotation, animationActions, isMoving, setModelRotation } =
    usePlayerStore();

  useFrame((_, delta) => {
    if (!rigidBody || !rigidBody.current) return;
    if (isMoving && !animationActions.Run?.isRunning()) {
      animationActions.Run?.play();
    }
    if (!isMoving && animationActions.Run?.isRunning()) {
      animationActions.Run?.stop();
    }

    const movement = rigidBody.current.linvel();
    const lerpFactor = 1 - Math.exp(-delta * 10);
    if (isMoving) {
      const targetRotation = Math.atan2(movement.x, movement.z);
      setModelRotation(targetRotation);

      if (animationActions.Run) {
        const targetSpeed = 1.0;
        const adjustedSpeed = THREE.MathUtils.lerp(
          animationActions.Run.getEffectiveTimeScale(),
          targetSpeed,
          lerpFactor
        );
        animationActions.Run.setEffectiveTimeScale(adjustedSpeed);
      }
    }
  });

  return null;
};
