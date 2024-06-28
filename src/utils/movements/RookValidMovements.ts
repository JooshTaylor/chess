import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";
import { getPieceAtPosition, canTake } from "../BoardHelper";

export function rookValidMovements(piece: Piece, state: GameState): Set<string> {
  const validPositions = new Set<string>([]);
  const add = (x: number, y: number) => validPositions.add(`${x}:${y}`);

  const { x: currentX, y: currentY } = piece;

  // Up
  let targetY = currentY + 1;

  while (targetY < 9) {
    const pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(currentX, targetY);
    targetY++;
  }

  // Right
  let targetX = currentX + 1;

  while (targetX < 9) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: currentY });
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(targetX, currentY);
    targetX++;
  }

  // Bottom
  targetY = currentY - 1;

  while (targetY > 0) {
    const pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(currentX, targetY);
    targetY--;
  }

  // Left
  targetX = currentX - 1;

  while (targetX > 0) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: currentY });
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(targetX, currentY);
    targetX--;
  }

  return validPositions;
}