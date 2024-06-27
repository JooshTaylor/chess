import { InitialBoard } from '../constants/InitialBoard';
import { InitialPieces } from '../constants/InitialPieces';
import { Grid } from '../interfaces/Grid';

export function loadInitialPieces(board: Grid = InitialBoard): Grid {
  return board.map(row => row.map(square => {
    const key = `${square.x}:${square.y}` as keyof typeof InitialPieces;

    const piece = InitialPieces[key];

    if (!piece)
      return square;

    return {
      ...square,
      piece
    };
  }))
}