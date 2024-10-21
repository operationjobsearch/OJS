import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GameProps } from "..";

export const Reticle = ({ player }: GameProps) => {
  const { camera } = useThree();

  useFrame(() => {
    if (!player.reticle.current) return;

    // Set the distance where the reticle will appear in front of the camera
    const distance = 15; // Increase the distance for visibility

    // Calculate the reticle's position directly in front of the camera
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);

    const reticlePosition = camera.position
      .clone()
      .add(cameraDir.multiplyScalar(distance));

    // Update the reticle's position to stay centered in front of the camera
    player.reticle.current.position.set(
      reticlePosition.x,
      reticlePosition.y,
      reticlePosition.z
    );

    // Ensure the reticle always faces the camera
    player.reticle.current.lookAt(camera.position);
  });

  return (
    <mesh ref={player.reticle}>
      <circleGeometry args={[0.05, 32]} /> {/* Increased size */}
      <meshBasicMaterial color="white" depthTest={false} />{" "}
      {/* Disable depth testing */}
    </mesh>
  );
};
