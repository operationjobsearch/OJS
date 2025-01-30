import {
  Projectiles,
  Reticle,
  handleKeyEvent,
  useCameraStore,
  usePlayerStore,
} from "..";
import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

export const Player = () => {
  const { camera } = useThree();
  const { θ } = useCameraStore();
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
    handleCollisions,
  } = usePlayerStore();

  const rigidBody = useRef<RapierRigidBody>(null);
  const characterModel = useRef<THREE.Object3D>(null);

  const playerModel = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(playerModel.animations, playerModel.scene);

  useEffect(() => {
    // initialize null properties on player object
    setRigidBody(rigidBody);
    setCharacterModel(characterModel);

    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyEvent(controls, e);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      handleKeyEvent(controls, e);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    setIsWalking(controls);
    setModelRotation(θ);
    setDirectionVectors(camera);
    setAnimationState(animations.actions, delta);
    setVelocity(delta);
  });

  return (
    <>
      <RigidBody
        ref={rigidBody}
        lockRotations={true}
        onCollisionEnter={({ other }) => {
          handleCollisions(other, true);
        }}
        onCollisionExit={({ other }) => {
          handleCollisions(other, false);
        }}
        colliders={"cuboid"}
        rotation={[0, modelRotation, 0]}
      >
        <primitive
          ref={characterModel}
          object={playerModel.scene}
          scale={0.01}
        />
      </RigidBody>
      <Reticle />
      <Projectiles />
    </>
  );
};
