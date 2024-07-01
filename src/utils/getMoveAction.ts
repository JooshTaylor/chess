import { Position } from "../interfaces/Position";
import { GameAction, GameState } from "../reducers/GameReducer";
import { getPieceAtPosition } from "./getPieceAtPosition";
import { PiecePositionMap } from "./getPiecePositionMap";
import { PieceValidPositionsMap } from "./getPieceValidPositionsMap";
import { getPositionId } from "./getPositionId";
import { isCastling } from "./isCastling";

export function getMoveAction(
  state: GameState,
  piecePositionMap: PiecePositionMap,
  pieceValidPositionMap: PieceValidPositionsMap,
  targetPosition: Position
): GameAction {
  if (state.selectedPiece === '')
    return;

  const selectedPiece = state.pieces[state.selectedPiece];

  const validPositions = pieceValidPositionMap.pieces[state.selectedPiece];
  if (!validPositions.has(getPositionId(targetPosition))) {
    return {
      type: 'deselect-piece',
      payload: {
        currentPosition: null,
        targetPosition: null
      }
    };
  }

  const currentPosition = piecePositionMap[selectedPiece.id];

  if (isCastling(selectedPiece, currentPosition, targetPosition)) {
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