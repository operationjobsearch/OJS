import { useGameStore } from '../..';

export const PauseMenu = () => {
  const { isPaused, setPaused } = useGameStore();

  if (!isPaused) return null;

  return (
    <div className="pause-menu">
      <div className="pause-overlay">
        <h2>Game Paused</h2>
        <br />
        <p>
          <button onClick={() => setPaused(false)}>Resume</button>
        </p>
      </div>
    </div>
  );
};
