import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";
import { getPieceAtPosition, canTake, isValidSquare } from "../BoardHelper";

export function knightValidMovements(piece: Piece, state: GameState): Set<string> {
  const validPositions = new Set<string>([]);
  const add = (x: number, y: number) => validPositions.add(`${x}:${y}`);

  const { x: currentX, y: currentY } = piece;

  // Top left

  let targetX = currentX - 1;
  let targetY = currentY + 2;

  let pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(targetX, targetY);

  // Top right

  targetX = currentX + 1;
  targetY = currentY + 2;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(targetX, targetY);

  // Right top

  targetX = currentX + 2;
  targetY = currentY + 1;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(targetX, targetY);

  // Right bottom

  targetX = currentX + 2;
  targetY = currentY - 1;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(targetX, targetY);

  // Bottom right

  targetX = currentX + 1;
  targetY = currentY - 2;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(targetX, targetY);

  // Bottom left

  targetX = currentX - 1;
  targetY = currentY - 2;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(targetX, targetY);

  // Left bottom

  targetX = currentX - 2;
  targetY = currentY - 1;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(targetX, targetY);

  // Left top

  targetX = currentX - 2;
  targetY = currentY + 1;

  pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
  if (isValidSquare(targetX, targetY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(targetX, targetY);

  return validPositions;
}