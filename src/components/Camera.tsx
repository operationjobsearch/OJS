import { useFrame, useThree } from "@react-three/fiber";
import { GameProps, moveCamera } from "..";

export const Camera = ({ player, game }: GameProps) => {
  const { camera } = useThree();

  useFrame((state, delta) => {
    moveCamera(camera, player, game, delta);
  });

  return null;
};
