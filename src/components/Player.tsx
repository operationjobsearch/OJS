import { animatePlayer, GameProps, movePlayer, updatePlayerState } from "..";
import { useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { useAnimations, useGLTF } from "@react-three/drei";

export const Player = ({ game, player }: GameProps) => {
  const playerModel = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(playerModel.animations, playerModel.scene);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      movePlayer(player, e.key, true);
      updatePlayerState(player);
      animatePlayer(player, animations.actions, e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      movePlayer(player, e.key, false);
      updatePlayerState(player);
      animatePlayer(player, animations.actions, e.key);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  }, [game.keyboardLayout]);

  return (
    <>
      <primitive
        ref={player.characterModel}
        object={playerModel.scene}
        scale={0.01}
        rotation-y={Math.PI}
      />
    </>
  );
};
