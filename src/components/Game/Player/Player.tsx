import {
  CollisionGroups,
  PlayerAnimation,
  PlayerCamera,
  PlayerCombat,
  PlayerMovement,
  usePlayerStore,
} from '../../..';
import { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { interactionGroups, RapierRigidBody, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

export const Player = () => {
  const { setCharacterModel, setRigidBody, handleCollisions, setAnimations, modelRotation } =
    usePlayerStore();

  const rb = useRef<RapierRigidBody>(null);
  const characterModel = useRef<THREE.Object3D>(null);

  // TODO: replace fox stand-in with game appropriate player model when available
  const playerModel = useGLTF('./Fox/glTF/Fox.gltf');
  const { actions } = useAnimations(playerModel.animations, playerModel.scene);

  useEffect(() => {
    // initialize null properties on player object
    setRigidBody(rb);
    setCharacterModel(characterModel);
    setAnimations(actions);
  }, []);

  return (
    <>
      <RigidBody
        ref={rb}
        lockRotations={true}
        onCollisionEnter={(o) => handleCollisions(o, true)}
        onCollisionExit={(o) => handleCollisions(o, false)}
        collisionGroups={interactionGroups(CollisionGroups.Player, [
          CollisionGroups.Enemy,
          CollisionGroups.EnemyProjectile,
        ])}
        colliders={'cuboid'}
        rotation={[0, modelRotation, 0]}
        name="player"
      >
        <primitive ref={characterModel} object={playerModel.scene} scale={0.01} />
        <PlayerMovement />
        <PlayerAnimation />
        <PlayerCamera />
        <PlayerCombat />
      </RigidBody>
    </>
  );
};
