import * as THREE from "three";
import { CameraControllerProps, Coordinate, moveCamera } from "..";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

const CameraController = ({ modelRef }: CameraControllerProps) => {
  const { set } = useThree();
  const mouseRef = useRef<Coordinate>({ x: 0, y: 0 });
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [cameraRef, set]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    moveCamera(cameraRef, modelRef, mouseRef);
  });

  return <perspectiveCamera ref={cameraRef} fov={75} />;
};

export default CameraController;
