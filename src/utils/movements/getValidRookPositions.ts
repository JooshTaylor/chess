import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";
import { getPieceAtPosition, canTake } from "../BoardHelper";
import { getValidPositionSet } from "../getValidPositions";
import { willMoveLeadToCheck } from "../willMoveLeadToCheck";

export function getValidRookPositions(piece: Piece, state: GameState): Set<string> {
  const { validPositions, addValidPosition } = getValidPositionSet();

  const { x: currentX, y: currentY } = piece;

  // Up
  let targetY = currentY + 1;

  while (targetY < 9) {
    const pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });
    if (pieceAtPosition) {
      if (canTake(piece, pieceAtPosition) && !willMoveLeadToCheck(state, { x: currentX, y: targetY }, state.turnColour))
        addValidPosition(currentX, targetY);

      break;
    }

    if (!willMoveLeadToCheck(state, { x: currentX, y: targetY }, state.turnColour))
      addValidPosition(currentX, targetY);

    targetY++;
  }

  // Right
  let targetX = currentX + 1;

  while (targetX < 9) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: currentY });
    if (pieceAtPosition) {
      if (canTake(piece, pieceAtPosition) && !willMoveLeadToCheck(state, { x: targetX, y: currentY }, state.turnColour))
        addValidPosition(targetX, currentY);

      break;
    }

    if (!willMoveLeadToCheck(state, { x: targetX, y: currentY }, state.turnColour))
      addValidPosition(targetX, currentY);

    targetX++;
  }

  // Bottom
  targetY = currentY - 1;

  while (targetY > 0) {
    const pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });
    if (pieceAtPosition) {
      if (canTake(piece, pieceAtPosition) && !willMoveLeadToCheck(state, { x: currentX, y: targetY }, state.turnColour))
        addValidPosition(currentX, targetY);

      break;
    }

    if (!willMoveLeadToCheck(state, { x: currentX, y: targetY }, state.turnColour))
      addValidPosition(currentX, targetY);

    targetY--;
  }

  // Left
  targetX = currentX - 1;

  while (targetX > 0) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: currentY });
    if (pieceAtPosition) {
      if (canTake(piece, pieceAtPosition) && !willMoveLeadToCheck(state, { x: targetX, y: currentY }, state.turnColour))
        addValidPosition(targetX, currentY);

      break;
    }

    if (!willMoveLeadToCheck(state, { x: targetX, y: currentY }, state.turnColour))
      addValidPosition(targetX, currentY);
    targetX--;
  }

  return validPositions;
}