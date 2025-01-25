import React from "react";
import { EnemyProps } from "../lib/types";
import { useGLTF } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Projectiles } from "..";

export const Enemy = ({ id, type, rigidBody }: EnemyProps) => {
  const enemyModel = useGLTF("./hamburger.glb");

  return (
    <>
      <RigidBody
        ref={rigidBody}
        lockRotations={true}
        colliders={"cuboid"}
        position={[3, 0, 3]}
      >
        <primitive
          object={enemyModel.scene}
          scale={0.1}
          rotation-y={Math.PI}
          //   position={[3, 0, 3]}
        />
      </RigidBody>
    </>
  );
};
