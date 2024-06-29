import { INITIAL_GAME_STATE } from "../constants/InitialGameState";
import { Piece } from "../interfaces/Piece";
import { Position } from "../interfaces/Position";

export function canPromotePiece(piece: Piece, targetPosition: Position): boolean {
  if (piece.type !== 'pawn')
    return false;

  const { y: initialY } = INITIAL_GAME_STATE.pieces[piece.id];

  if (initialY === 2 && targetPosition.y === 8)
    return true;

  if (initialY === 7 && targetPosition.y === 1)
    return true;

  return false;
}