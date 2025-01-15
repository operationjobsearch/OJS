import { useFrame, useThree } from "@react-three/fiber";
import { useCameraStore, useGameStore, usePlayerStore } from "..";
import { useEffect, useRef } from "react";

export const Camera = () => {
  const { camera } = useThree();
  const { stats } = useGameStore();
  const { mouseMovement, rigidBody } = usePlayerStore();
  const { setCameraAngles, setCameraPosition } = useCameraStore();

  useEffect(() => {
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
  }, []);

  useFrame((_, delta) => {
    stats.begin();

    setCameraAngles(delta, mouseMovement);
    setCameraPosition(camera, rigidBody);

    stats.end();
  });

  return null;
};
