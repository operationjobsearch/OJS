import { useFrame, useThree } from "@react-three/fiber";
import { useCameraStore, useGameStore, usePlayerStore } from "..";
import { useEffect, useRef } from "react";

export const Camera = () => {
  const { camera } = useThree();
  const { stats, fpsLimit } = useGameStore();
  const { mouseMovement, rigidBody } = usePlayerStore();
  const { setCameraAngles, setCameraPosition } = useCameraStore();
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
  }, []);

  useFrame((_, delta) => {
    stats.begin();
    // console.log("frametime", delta);

    const updateInterval = 1 / fpsLimit;
    lastUpdateTime.current += delta;

    if (lastUpdateTime.current >= updateInterval) {
      setCameraAngles(delta, mouseMovement);
      setCameraPosition(camera, rigidBody);

      // Reset the last update time
      lastUpdateTime.current = 0;
    }

    stats.end();
  });

  return null;
};
