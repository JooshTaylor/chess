import { Piece } from "../interfaces/Piece";
import { Position } from "../interfaces/Position";

export function isCastling(piece: Piece, targetPosition: Position): boolean {
  return piece.type === 'king' && Math.abs(piece.x - targetPosition.x) === 2;
}