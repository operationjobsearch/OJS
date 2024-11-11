import { GameProps, movePlayer, updatePlayerState } from "..";
import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export const Player = ({ game, player }: GameProps) => {
  const { camera } = useThree();
  const playerModel = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(playerModel.animations, playerModel.scene);

  useFrame((delta) => {
    updatePlayerState(game, player, camera, animations.actions);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      movePlayer(player, e.key, true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      movePlayer(player, e.key, false);
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
