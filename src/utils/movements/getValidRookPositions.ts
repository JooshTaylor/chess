import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getPieceAtPosition, canTake } from "../BoardHelper";
import { getValidPositionSet } from "../getValidPositions";

export function getValidRookPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap): Set<string> {
  const { validPositions, addValidPosition } = getValidPositionSet();

  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  // Up
  let targetY = currentY + 1;

  while (targetY < 9) {
    const pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });
    if (pieceAtPosition) {
      if (canTake(piece, pieceAtPosition))
        addValidPosition(currentX, targetY);

      break;
    }

    addValidPosition(currentX, targetY);

    targetY++;
  }

  // Right
  let targetX = currentX + 1;

  while (targetX < 9) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: currentY });
    if (pieceAtPosition) {
      if (canTake(piece, pieceAtPosition))
        addValidPosition(targetX, currentY);

      break;
    }

    addValidPosition(targetX, currentY);

    targetX++;
  }

  // Bottom
  targetY = currentY - 1;

  while (targetY > 0) {
    const pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });
    if (pieceAtPosition) {
      if (canTake(piece, pieceAtPosition))
        addValidPosition(currentX, targetY);

      break;
    }

    addValidPosition(currentX, targetY);

    targetY--;
  }

  // Left
  targetX = currentX - 1;

  while (targetX > 0) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: currentY });
    if (pieceAtPosition) {
      if (canTake(piece, pieceAtPosition))
        addValidPosition(targetX, currentY);

      break;
    }

    addValidPosition(targetX, currentY);
    targetX--;
  }

  return validPositions;
}