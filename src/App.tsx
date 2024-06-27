import React from 'react';
import { Board } from './components/board/Board';
import { Grid } from './interfaces/Grid';
import { loadInitialPieces } from './utils/BoardHelper';

function App() {
  const [board] = React.useState<Grid>(loadInitialPieces);

  return (
    <Board
      board={board}
    />
  );
}

export default App;
