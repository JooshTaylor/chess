import { Piece } from "../interfaces/Piece";
import { Position } from "../interfaces/Position";

export function isCastling(piece: Piece, currentPosition: Position, targetPosition: Position): boolean {
  return piece.type === 'king' && Math.abs(currentPosition.x - targetPosition.x) === 2;
}