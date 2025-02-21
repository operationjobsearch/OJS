import { HealthBar, usePlayerStore } from '../..';

export const HUD = () => {
  const { health } = usePlayerStore();

  return (
    <div className="hud-container">
      <HealthBar />
    </div>
  );
};
