import { ICell } from '../interfaces/Cell';
import { Piece } from '../interfaces/Piece';
import { GameState } from '../reducers/GameReducer';
import { CanTakeLookups } from './MovementHelper';

export function getCellPosition(cell: ICell): `${number}:${number}` {
  if (!cell)
    return null;

  return `${cell.x}:${cell.y}`;
}

export function getPieceAtPosition(state: GameState, cell: ICell): Piece | null {
  const pieceId = state.positions[cell.y]?.[cell.x];

  if (pieceId === '')
    return null;

  if (!pieceId)
    return null;

  return state.pieces[pieceId];
}

export function convertNumberToChar(num: number): string {
  return String.fromCharCode(num + 96);
}

export function canTake(currentPiece: Piece, targetPiece: Piece): boolean {
  if (currentPiece.colour === targetPiece.colour)
    return false;

  return CanTakeLookups[currentPiece.type].has(targetPiece.type);
}

export function isValidSquare(x: number, y: number): boolean {
  return x > 0 && y > 0 && x < 9 && y < 9;
}