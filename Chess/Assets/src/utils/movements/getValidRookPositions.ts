import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getValidPositionSet } from "../getValidPositions";

export function getValidRookPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap): Set<string> {
  const { validPositions, tryAddPosition } = getValidPositionSet();

  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  // Up
  let targetX = currentX;
  let targetY = currentY + 1;

  while (targetY < 9) {
    const { canContinueInDirection } = tryAddPosition(state, piece, { x: targetX, y: targetY });

    if (!canContinueInDirection)
      break;

    targetY++;
  }

  // Right
  targetX = currentX + 1;
  targetY = currentY;

  while (targetX < 9) {
    const { canContinueInDirection } = tryAddPosition(state, piece, { x: targetX, y: targetY });

    if (!canContinueInDirection)
      break;

    targetX++;
  }

  // Bottom
  targetX = currentX;
  targetY = currentY - 1;

  while (targetY > 0) {
    const { canContinueInDirection } = tryAddPosition(state, piece, { x: targetX, y: targetY });

    if (!canContinueInDirection)
      break;

    targetY--;
  }

  // Left
  targetX = currentX - 1;
  targetY = currentY;

  while (targetX > 0) {
    const { canContinueInDirection } = tryAddPosition(state, piece, { x: targetX, y: targetY });

    if (!canContinueInDirection)
      break;

    targetX--;
  }

  return validPositions;
}