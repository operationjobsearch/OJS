import {
  CameraControllerProps,
  Coordinate,
  moveCamera,
  // EnhancedOrbitControls,
} from "..";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { useEffect, useRef, useState } from "react";

export const CameraController = ({ characterModel }: CameraControllerProps) => {
  const { camera, gl } = useThree();
  const [mousePos, setMousePos] = useState<Coordinate>({ x: 0, y: 0 });

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    // controls.enableRotate = false;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    moveCamera(camera, characterModel, mousePos);

    // orbitControls.update();
  });

  return null;
};
