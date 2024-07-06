import { Piece } from "../interfaces/Piece";
import { Position } from "../interfaces/Position";

export function canPromotePiece(piece: Piece, targetPosition: Position): boolean {
  if (piece.type !== 'pawn')
    return false;

  if (piece.colour === 'white' && targetPosition.y === 8)
    return true;

  if (piece.colour === 'black' && targetPosition.y === 1)
    return true;

  return false;
}