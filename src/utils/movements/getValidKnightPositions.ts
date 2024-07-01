import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getPieceAtPosition, canTake, isValidSquare } from "../BoardHelper";
import { getValidPositionSet } from "../getValidPositions";

export function getValidKnightPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap): Set<string> {
  const { validPositions, addValidPosition } = getValidPositionSet();

  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  // Top left

  let targetX = currentX - 1;
  let targetY = currentY + 2;

  let pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    addValidPosition(targetX, targetY);

  // Top right

  targetX = currentX + 1;
  targetY = currentY + 2;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    addValidPosition(targetX, targetY);

  // Right top

  targetX = currentX + 2;
  targetY = currentY + 1;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    addValidPosition(targetX, targetY);

  // Right bottom

  targetX = currentX + 2;
  targetY = currentY - 1;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    addValidPosition(targetX, targetY);

  // Bottom right

  targetX = currentX + 1;
  targetY = currentY - 2;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    addValidPosition(targetX, targetY);

  // Bottom left

  targetX = currentX - 1;
  targetY = currentY - 2;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    addValidPosition(targetX, targetY);

  // Left bottom

  targetX = currentX - 2;
  targetY = currentY - 1;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    addValidPosition(targetX, targetY);

  // Left top

  targetX = currentX - 2;
  targetY = currentY + 1;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    addValidPosition(targetX, targetY);

  return validPositions;
}