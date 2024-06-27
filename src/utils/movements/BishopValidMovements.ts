import { Grid } from "../../interfaces/Grid";
import { Position } from "../../interfaces/Position";
import { IBishop } from "../../interfaces/pieces/IBishop";
import { splitPosition, convertCharToNumber, convertNumberToChar, getPieceAtPosition, canTake } from "../BoardHelper";

export function bishopValidMovements(piece: IBishop, position: Position, board: Grid): Set<Position> {
  const validPositions = new Set<Position>([]);

  const add = (x: number, y: number) => validPositions.add(`${convertNumberToChar(x)}:${y}`);

  const [ x, y ] = splitPosition(position);

  const xNumeric = convertCharToNumber(x);
  const yNumeric = Number(y);

  // Top left
  let currentX = xNumeric - 1;
  let currentY = yNumeric + 1;

  while (currentX > 0 && currentY < 9) {
    const pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(currentX, currentY);

    currentX--;
    currentY++;
  }

  // Top right
  currentX = xNumeric + 1
  currentY = yNumeric + 1

  while (currentX < 9 && currentY < 9) {
    const pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(currentX, currentY);

    currentX++;
    currentY++;
  }

  // Bottom right
  currentX = xNumeric + 1;
  currentY = yNumeric - 1;

  while (currentX < 9 && currentY > 0) {
    const pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(currentX, currentY);

    currentX++;
    currentY--;
  }

  // Bottom left
  currentX = xNumeric - 1;
  currentY = yNumeric - 1;

  while (currentX > 0 && currentY > 0) {
    const pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(currentX, currentY);

    currentX--;
    currentY--;
  }

  return validPositions;
}