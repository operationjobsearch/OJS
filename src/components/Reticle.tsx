import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RenderOrders, useCameraStore, usePlayerStore } from "..";

export const Reticle = () => {
  const { camera } = useThree();
  const { cameraRadius } = useCameraStore();
  const { setReticle, playerColliderRadius } = usePlayerStore();
  const reticle = useRef<THREE.Mesh>(null);

  useEffect(() => {
    setReticle(reticle);
    reticle.current!.renderOrder = RenderOrders.hud;
  }, []);

  useFrame(() => {
    if (reticle.current) {
      const distance = cameraRadius + playerColliderRadius + 10;
      const direction = new THREE.Vector3(0, 0, -1);
      direction.applyQuaternion(camera.quaternion);
      reticle.current.position
        .copy(camera.position)
        .add(direction.multiplyScalar(distance));

      reticle.current.lookAt(camera.position);
    }
  });

  return (
    <mesh ref={reticle}>
      <circleGeometry args={[0.03, 32]} />
      <meshBasicMaterial color="white" depthTest={false} transparent={true} />
    </mesh>
  );
};
