import { GameProps, handleKeyEvent, updatePlayerState } from "..";
import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

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

  useFrame((delta) => {
    updatePlayerState(game, player, camera, animations.actions);
  });

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
