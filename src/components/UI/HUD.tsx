import { usePlayerStore } from '../..';

export const HUD = () => {
  const { health } = usePlayerStore();

  return (
    <div className="hud-container">
      <div className="health-bar-container">
        <div
          className="health-bar"
          style={{
            width: `${health}%`,
            backgroundColor: health > 75 ? 'green' : health > 50 ? 'yellow' : 'red',
          }}
        />
        <span className="health-text">{health} / 100</span>
      </div>
    </div>
  );
};
