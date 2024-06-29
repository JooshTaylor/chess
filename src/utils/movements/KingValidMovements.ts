import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";
import { canTake, getPieceAtPosition, isValidSquare } from "../BoardHelper";

export function kingValidMovements(piece: Piece, state: GameState): Set<string> {
  const validPositions = new Set<string>([]);

  function addIfValid(x: number, y: number): void {
    const pieceAtPosition = getPieceAtPosition(state, { x, y });
  
    if (isValidSquare(x, y) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
      validPositions.add(`${x}:${y}`);
  }

  const { x: currentX, y: currentY } = piece;

  // Up
  addIfValid(currentX, currentY + 1);

  // Top right
  addIfValid(currentX + 1, currentY + 1);

  // Right
  addIfValid(currentX + 1, currentY);

  // Bottom right
  addIfValid(currentX + 1, currentY - 1);

  // Down
  addIfValid(currentX, currentY - 1);

  // Down left
  addIfValid(currentX - 1, currentY - 1);

  // Left
  addIfValid(currentX - 1, currentY);

  // Top left
  addIfValid(currentX - 1, currentY + 1);

  return validPositions;
}

