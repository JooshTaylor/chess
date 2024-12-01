
import { Position } from "../interfaces/Position";
import { GameAction, GameState } from "../reducers/GameReducer";
import { getPieceAtPosition } from "./getPieceAtPosition";
import { isCastling } from "./isCastling";
import { isEnPassant } from "./isEnPassant";

export function getMoveAction(state: GameState, selectedPieceId: number, currentPosition: Position, targetPosition: Position): GameAction {
  if (!selectedPieceId)
    return null;

  const selectedPiece = state.pieces[selectedPieceId];
  
  if (isCastling(selectedPiece, currentPosition, targetPosition)) {
    return {
      type: 'castle',
      payload: {
        currentPosition,
        targetPosition
      }
    };
  }

  if (isEnPassant(state, selectedPiece, currentPosition, targetPosition)) {
    return {
      type: 'en-passant',
      payload: {
        currentPosition,
        targetPosition
      }
    }
  }

  const pieceAtPosition = getPieceAtPosition(state, targetPosition);

  if (pieceAtPosition) {
    return {
      type: 'take-piece',
      payload: {
        currentPosition,
        targetPosition
      }
    };
  } else {
    return {
      type: 'move-piece',
      payload: {
        currentPosition,
        targetPosition
      }
    };
  }
}