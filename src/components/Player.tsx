import {
  GameProps,
  handleCollisions,
  handleKeyEvent,
  updatePlayerState,
} from "..";
import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CapsuleCollider,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";

export const Player = ({ game, player }: GameProps) => {
  const { camera } = useThree();
  const playerModel = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(playerModel.animations, playerModel.scene);
  const rigidBodyProps: RigidBodyProps = {
    lockRotations: true,
    colliders: false,
    linearDamping: 5,
    onCollisionEnter: ({ other }) => {
      handleCollisions(player, other, true);
    },
    onCollisionExit: ({ other }) => {
      handleCollisions(player, other, false);
    },
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyEvent(player, e);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      handleKeyEvent(player, e);
    };

    const handleMouseDown = (e: MouseEvent) => {
      handleMouseEvent(player, e);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    updatePlayerState(game, player, camera, animations.actions, delta);
  });

  return (
    <RigidBody ref={player.rigidBody} {...rigidBodyProps}>
      <CapsuleCollider
        args={[0.1, 0.5]}
        position={[0, 0.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        friction={0}
      />
      <primitive
        ref={player.characterModel}
        object={playerModel.scene}
        scale={0.01}
        rotation-y={Math.PI}
      />
    </RigidBody>
  );
};
