import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";
import { getPieceAtPosition, canTake } from "../BoardHelper";

export function bishopValidMovements(piece: Piece, state: GameState): Set<string> {
  const validPositions = new Set<string>([]);
  const add = (x: number, y: number) => validPositions.add(`${x}:${y}`);

  const { x: currentX, y: currentY } = piece;

  // Top left
  let targetX = currentX - 1;
  let targetY = currentY + 1;

  while (targetX > 0 && targetY < 9) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(targetX, targetY);

    targetX--;
    targetY++;
  }

  // Top right
  targetX = currentX + 1
  targetY = currentY + 1

  while (targetX < 9 && targetY < 9) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(targetX, targetY);

    targetX++;
    targetY++;
  }

  // Bottom right
  targetX = currentX + 1;
  targetY = currentY - 1;

  while (targetX < 9 && targetY > 0) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(targetX, targetY);

    targetX++;
    targetY--;
  }

  // Bottom left
  targetX = currentX - 1;
  targetY = currentY - 1;

  while (targetX > 0 && targetY > 0) {
    const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(targetX, targetY);

    targetX--;
    targetY--;
  }

  return validPositions;
}