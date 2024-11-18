import {
  GameProps,
  handleCollisions,
  handleKeyEvent,
  updatePlayerState,
} from "..";
import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

export const Player = ({ game, player }: GameProps) => {
  const { camera } = useThree();
  const playerModel = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(playerModel.animations, playerModel.scene);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyEvent(player, e);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      handleKeyEvent(player, e);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    state.setFrameloop();
    updatePlayerState(game, player, camera, animations.actions);
    console.log(delta);
  });

  return (
    <>
      <RigidBody
        ref={player.rigidBody}
        lockRotations
        linearDamping={2}
        colliders={false}
        mass={20}
        friction={0}
        onCollisionEnter={({ other }) => {
          handleCollisions(player, other, true);
        }}
        onCollisionExit={({ other }) => {
          handleCollisions(player, other, false);
        }}
      >
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
    </>
  );
};
