import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getValidPositionSet } from "../getValidPositions";
import { PieceValidPositionsMap } from "../getPieceValidPositionsMap";

export function getValidBishopPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap, pieceValidPositionMap: PieceValidPositionsMap): Set<string> {
  const { validPositions, tryAddPosition } = getValidPositionSet();

  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  // Top left
  let targetX = currentX - 1;
  let targetY = currentY + 1;

  while (targetX > 0 && targetY < 9) {
    const { canContinueInDirection } = tryAddPosition(state, piece, { x: targetX, y: targetY }, piecePositionMap, pieceValidPositionMap);

    if (!canContinueInDirection)
      break;

    targetX--;
    targetY++;
  }

  // Top right
  targetX = currentX + 1
  targetY = currentY + 1

  while (targetX < 9 && targetY < 9) {
    const { canContinueInDirection } = tryAddPosition(state, piece, { x: targetX, y: targetY }, piecePositionMap, pieceValidPositionMap);

    if (!canContinueInDirection)
      break;

    targetX++;
    targetY++;
  }

  // Bottom right
  targetX = currentX + 1;
  targetY = currentY - 1;

  while (targetX < 9 && targetY > 0) {
    const { canContinueInDirection } = tryAddPosition(state, piece, { x: targetX, y: targetY }, piecePositionMap, pieceValidPositionMap);

    if (!canContinueInDirection)
      break;

    targetX++;
    targetY--;
  }

  // Bottom left
  targetX = currentX - 1;
  targetY = currentY - 1;

  while (targetX > 0 && targetY > 0) {
    const { canContinueInDirection } = tryAddPosition(state, piece, { x: targetX, y: targetY }, piecePositionMap, pieceValidPositionMap);

    if (!canContinueInDirection)
      break;

    targetX--;
    targetY--;
  }

  return validPositions;
}