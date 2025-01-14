import { useFrame, useThree } from "@react-three/fiber";
import { useCameraStore, usePlayerStore } from "..";

export const Camera = () => {
  const { camera } = useThree();
  const { mouseMovement, rigidBody } = usePlayerStore();
  const { setCameraAngles, setCameraPosition } = useCameraStore();

  useFrame((_, delta) => {
    setCameraAngles(delta, mouseMovement);
    setCameraPosition(camera, rigidBody);
  });

  return null;
};
