import {
  handleCollisions,
  handleKeyEvent,
  useCameraStore,
  usePlayerStore,
} from "..";
import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CapsuleCollider,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";

export const Player = () => {
  const { camera } = useThree();
  const { cameraAngleTheta } = useCameraStore();
  const {
    rigidBody,
    characterModel,
    controls,
    isOnFloor,
    setIsWalking,
    setModelRotation,
    setDirectionVectors,
    setAnimationState,
    setVelocity,
  } = usePlayerStore();

  const playerModel = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(playerModel.animations, playerModel.scene);

  const rigidBodyProps: RigidBodyProps = {
    lockRotations: true,
    colliders: false,
    linearDamping: 5,
    onCollisionEnter: ({ other }) => {
      handleCollisions(isOnFloor, other, true);
    },
    onCollisionExit: ({ other }) => {
      handleCollisions(isOnFloor, other, false);
    },
  };

  useEffect(() => {
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
    setModelRotation(cameraAngleTheta);
    setDirectionVectors(camera);
    setAnimationState(animations.actions, delta);
    setVelocity(delta);
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
