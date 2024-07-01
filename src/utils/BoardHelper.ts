import { Piece } from '../interfaces/Piece';
import { Position } from '../interfaces/Position';
import { GameState } from '../reducers/GameReducer';

export function getPositionId(position: Position): `${number}:${number}` {
  if (!position)
    return null;

  return `${position.x}:${position.y}`;
}

export function getPieceAtPosition(state: GameState, position: Position): Piece | null {
  const pieceId = state.positions[position.x]?.[position.y];

  if (pieceId === '')
    return null;

  if (!pieceId)
    return null;

  const piece = state.pieces[pieceId];

  if (piece.status === 'dead')
    return null;

  return piece;
}

export function canTake(currentPiece: Piece, targetPiece: Piece): boolean {
  return currentPiece.colour !== targetPiece.colour;
}

export function convertNumberToChar(num: number): string {
  return String.fromCharCode(num + 96);
}

export function isValidSquare(x: number, y: number): boolean {
  return x > 0 && y > 0 && x < 9 && y < 9;
}