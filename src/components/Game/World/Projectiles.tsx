import { Projectile, useGameStore } from '../../..';

export const Projectiles = () => {
  const { projectiles } = useGameStore();
  return projectiles.map((projectile) => <Projectile {...projectile} key={projectile.id} />);
};
