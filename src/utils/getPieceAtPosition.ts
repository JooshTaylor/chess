import { Piece } from "../interfaces/Piece";
import { Position } from "../interfaces/Position";
import { GameState } from "../reducers/GameReducer";

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