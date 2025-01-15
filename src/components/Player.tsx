import {
  handleKeyEvent,
  useCameraStore,
  useGameStore,
  usePlayerStore,
} from "..";
import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import * as THREE from "three";

export const Player = () => {
  const { camera } = useThree();
  const { fpsLimit } = useGameStore();
  const { cameraAngleTheta } = useCameraStore();
  const {
    controls,
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
  // TODO: add update interval tracker to game store for global use
  const lastUpdateTime = useRef(0);

  const playerModel = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(playerModel.animations, playerModel.scene);

  const rigidBodyProps: RigidBodyProps = {
    lockRotations: true,
    colliders: false,
    linearDamping: 5,
    onCollisionEnter: ({ other }) => {
      handleCollisions(other, true);
    },
    onCollisionExit: ({ other }) => {
      handleCollisions(other, false);
    },
  };

  useEffect(() => {
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
    const updateInterval = 1 / fpsLimit;
    lastUpdateTime.current += delta;

    if (lastUpdateTime.current >= updateInterval) {
      setIsWalking(controls);
      setModelRotation(cameraAngleTheta);
      setDirectionVectors(camera);
      setAnimationState(animations.actions, delta);
      setVelocity(delta);

      // Reset the last update time
      lastUpdateTime.current = 0;
    }
  });

  return (
    <RigidBody ref={rigidBody} {...rigidBodyProps}>
      <CapsuleCollider
        args={[0.1, 0.5]}
        position={[0, 0.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        friction={0}
      />
      <primitive
        ref={characterModel}
        object={playerModel.scene}
        scale={0.01}
        rotation-y={Math.PI}
      />
    </RigidBody>
  );
};
