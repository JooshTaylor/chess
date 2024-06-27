import { InitialBoard } from '../constants/InitialBoard';
import { InitialPieces } from '../constants/InitialPieces';
import { Cell } from '../interfaces/Cell';
import { Grid } from '../interfaces/Grid';
import { Position } from '../interfaces/Position';
import { XAxisPositions } from '../interfaces/XAxisPositions';
import { YAxisPositions } from '../interfaces/YAxisPositions';

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

export function getCellPosition(cell: Cell): Position {
  if (!cell)
    return null;

  return `${cell.x}:${cell.y}`;
}

export function splitPosition(pos: Position): [ XAxisPositions, YAxisPositions ] {
  return pos.split(':') as [ XAxisPositions, YAxisPositions ];
}

export function convertCharToNumber(char: string): number {
  return char.charCodeAt(0) - 96
}

export function convertNumberToChar(num: number): string {
  return String.fromCharCode(num + 96);
}