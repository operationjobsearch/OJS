import * as THREE from "three";
import { CameraControllerProps } from "../lib";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const CameraController = ({ playerRef }: CameraControllerProps) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { set } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [cameraRef, set]);

  useFrame(() => {
    if (cameraRef.current && playerRef.current) {
      const playerPosition = playerRef.current.position;

      const offset = new THREE.Vector3(0, 2, 8);
      const cameraPosition = playerPosition.clone().add(offset);
      cameraRef.current.position.lerp(cameraPosition, 0.1);

      cameraRef.current.lookAt(playerPosition);
    }
  });

  return <perspectiveCamera ref={cameraRef} fov={75} />;
};

export default CameraController;
