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
    // TODO: remove stats.js and add current fps component with value in gameStore?
    // include min, max, and avg fps
    // console.log("frameTime", delta);
    // console.log("fps", 1 / delta);

    stats.begin();

    setCameraAngles(delta, mouseMovement);
    setCameraPosition(camera, rigidBody);

    stats.end();
  });

  return null;
};
