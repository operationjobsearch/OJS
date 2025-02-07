import { MainMenu, EndMenu, Game, GameState, useGameStore } from '.';

export const App = () => {
  const { gameState } = useGameStore();

  switch (gameState) {
    case GameState.MainMenu:
      return <MainMenu />;
    case GameState.Active:
      return <Game />;
    case GameState.Lost:
      return <EndMenu endState={GameState.Lost} />;
    case GameState.Won:
      return <EndMenu endState={GameState.Won} />;
  }
};
