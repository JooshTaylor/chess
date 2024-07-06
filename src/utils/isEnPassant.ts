import { Piece } from "../interfaces/Piece";
import { Position } from "../interfaces/Position";
import { GameState } from "../reducers/GameReducer";
import { getPieceAtPosition } from "./getPieceAtPosition";

export function isEnPassant(state: GameState, piece: Piece, currentPosition: Position, targetPosition: Position): boolean {
  // Only pawns may perform this move
  if (piece.type !== 'pawn')
    return false;

  // En passant can only happen when moving diagonally
  if (currentPosition.x === targetPosition.x)
    return false;

  // If the pawn is moving diagonally to capture another piece, en passant cannot be performed
  if (getPieceAtPosition(state, targetPosition))
    return false;

  /**
   * If all of the above cases are false, it means
   * our piece is moving diagonally to an empty square. getValidPawnPositions will only
   * allow this to occur when a valid en passant move is available, so we know in this case
   * that that is what's happening.
   */
  return true;
}