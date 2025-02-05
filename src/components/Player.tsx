import { Reticle, handleKeyEvent, useCameraStore, useGameStore, usePlayerStore } from '..';
import { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

export const Player = () => {
  const { camera } = useThree();
  const { θ } = useCameraStore();
  const { isPaused } = useGameStore();
  const {
    controls,
    modelRotation,
    setIsWalking,
    setModelRotation,
    setDirectionVectors,
    setAnimationState,
    setVelocity,
    setCharacterModel,
    setRigidBody,
    setIsFiringPrimary,
    setIsChargingSecondary,
    setShouldFireSecondary,
    setChargeStartTime,
    handleCollisions,
  } = usePlayerStore();

  const rb = useRef<RapierRigidBody>(null);
  const characterModel = useRef<THREE.Object3D>(null);

  const playerModel = useGLTF('./Fox/glTF/Fox.gltf');
  const animations = useAnimations(playerModel.animations, playerModel.scene);

  useEffect(() => {
    // initialize null properties on player object
    setRigidBody(rb);
    setCharacterModel(characterModel);

    const handleKeyDown = (e: KeyboardEvent) => handleKeyEvent(controls, e);
    const handleKeyUp = (e: KeyboardEvent) => handleKeyEvent(controls, e);
    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) setIsFiringPrimary(false);
      if (e.button === 2) {
        setIsChargingSecondary(false);
        setShouldFireSecondary(true);
      }
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) setIsFiringPrimary(true);
      if (e.button === 2) {
        setChargeStartTime(performance.now());
        setIsChargingSecondary(true);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!isPaused) return;
    console.log('player not paused');
    setIsWalking(controls);
    setModelRotation(θ);
    setDirectionVectors(camera);
    setAnimationState(animations.actions, delta);
    setVelocity(delta);
  });

  return (
    <>
      <RigidBody
        ref={rb}
        lockRotations={true}
        onCollisionEnter={(o) => handleCollisions(o, true)}
        onCollisionExit={(o) => handleCollisions(o, false)}
        colliders={'cuboid'}
        rotation={[0, modelRotation, 0]}
      >
        <primitive ref={characterModel} object={playerModel.scene} scale={0.01} />
      </RigidBody>
      <Reticle />
    </>
  );
};
