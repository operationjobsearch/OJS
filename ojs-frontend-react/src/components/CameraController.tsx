import { useFrame, useThree } from "@react-three/fiber";
import { GameProps, moveCamera, setCameraAngles } from "..";

export const CameraController = ({ player, game }: GameProps) => {
  const { camera } = useThree();

  useFrame(() => {
    setCameraAngles(player.characterModel, player.mouseMovement, game);
    moveCamera(camera, player.characterModel, player.mouseMovement, game);
  });

  return null;
};
