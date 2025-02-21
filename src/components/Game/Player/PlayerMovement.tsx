import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { useGameStore, usePlayerStore } from '../../..';
import * as THREE from 'three';

export const PlayerMovement = () => {
  const { isPaused } = useGameStore();
  const { moveSpeed, rigidBody, directions, setIsMoving } = usePlayerStore();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((_, delta) => {
    if (isPaused || !rigidBody || !rigidBody.current) return;

    const { forward, back, left, right } = getKeys();
    setIsMoving(forward || back || left || right);
    const velocity = new THREE.Vector3();

    if (forward) velocity.add(directions.forwardVector);
    if (back) velocity.add(directions.backVector);
    if (left) velocity.add(directions.leftVector);
    if (right) velocity.add(directions.rightVector);

    if (velocity.length() > 0) {
      velocity.normalize().multiplyScalar(moveSpeed);
    }

    const lerpFactor = 1 - Math.exp(-delta * 15);

    const currentVelocity = rigidBody.current.linvel();
    const smoothedVelocity = new THREE.Vector3(
      THREE.MathUtils.lerp(currentVelocity.x, velocity.x, lerpFactor),
      currentVelocity.y,
      THREE.MathUtils.lerp(currentVelocity.z, velocity.z, lerpFactor)
    );

    rigidBody.current.setLinvel(
      { x: smoothedVelocity.x, y: smoothedVelocity.y, z: smoothedVelocity.z },
      true
    );
  });

  return null;
};
