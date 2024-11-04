import { useFrame, useThree } from "@react-three/fiber";
import { GameProps, moveCamera } from "..";

export const CameraController = ({ player, game }: GameProps) => {
  const { camera } = useThree();

  useFrame(() => {
    moveCamera(
      camera,
      player.characterModel,
      player.rigidBody,
      player.mouseMovement,
      game
    );
  });

  return null;
};
