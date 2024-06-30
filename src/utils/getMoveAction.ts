import { Position } from "../interfaces/Position";
import { GameAction, GameState } from "../reducers/GameReducer";
import { getPieceAtPosition, getPositionId } from "./BoardHelper";
import { getValidPositions } from "./getValidPositions";
import { isCastling } from "./isCastling";

interface MoveActionOptions {
  validatePositions: boolean;
}

export function getMoveAction(state: GameState, targetPosition: Position, options: MoveActionOptions): GameAction {
  if (state.selectedPiece === '')
    return;

  const selectedPiece = state.pieces[state.selectedPiece];

  if (options.validatePositions) {
    const validPositions = getValidPositions(state, selectedPiece)
  
    if (!validPositions.has(getPositionId(targetPosition))) {
      return {
        type: 'deselect-piece',
        payload: {
          currentPosition: null,
          targetPosition: null
        }
      };
    }
  }

  const currentPosition: Position = { x: selectedPiece.x, y: selectedPiece.y };

  if (isCastling(selectedPiece, targetPosition)) {
    return {
      type: 'castle',
      payload: {
        currentPosition,
        targetPosition
      }
    };
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