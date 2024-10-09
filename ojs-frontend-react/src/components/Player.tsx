import * as THREE from "three";
import { MeshProps } from "@react-three/fiber";
import { forwardRef } from "react";

const Player = forwardRef<THREE.Mesh, MeshProps>((meshProps, ref) => {
  return (
    <mesh ref={ref} {...meshProps}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
});

export default Player;
