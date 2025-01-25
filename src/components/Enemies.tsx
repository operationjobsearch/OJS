import React from "react";
import { Enemy, useEnemyStore } from "../";

export const Enemies = () => {
  const { enemies, destroyEnemy } = useEnemyStore();
  return enemies.map((enemy) => (
    <Enemy {...enemy} key={enemy.id} onExpire={() => destroyEnemy(enemy.id)} />
  ));
};
