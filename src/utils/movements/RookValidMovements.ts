import { Grid } from "../../interfaces/Grid";
import { Position } from "../../interfaces/Position";
import { IRook } from "../../interfaces/pieces/IRook";
import { splitPosition, convertCharToNumber, getPieceAtPosition, canTake, convertNumberToChar } from "../BoardHelper";

export function rookValidMovements(piece: IRook, position: Position, board: Grid): Set<Position> {
  const validPositions = new Set<Position>([]);

  const add = (x: number, y: number) => validPositions.add(`${convertNumberToChar(x)}:${y}`);

  const [ x, y ] = splitPosition(position);

  const xNumeric = convertCharToNumber(x);
  const yNumeric = Number(y);

  console.log(xNumeric, yNumeric);

  // Up
  let currentY = yNumeric + 1;

  while (currentY < 9) {
    const pieceAtPosition = getPieceAtPosition(board, xNumeric, currentY);
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(xNumeric, currentY);
    currentY++;
  }

  // Right
  let currentX = xNumeric + 1;

  while (currentX < 9) {
    const pieceAtPosition = getPieceAtPosition(board, currentX, yNumeric);
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(currentX, yNumeric);
    currentX++;
  }

  // Bottom
  currentY = yNumeric - 1;

  while (currentY > 0) {
    const pieceAtPosition = getPieceAtPosition(board, xNumeric, currentY);
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(xNumeric, currentY);
    currentY--;
  }

  // Left
  currentX = xNumeric - 1;

  while (currentX > 0) {
    const pieceAtPosition = getPieceAtPosition(board, currentX, yNumeric);
    if (pieceAtPosition) {
      if (!canTake(piece, pieceAtPosition))
        break;
    }

    add(currentX, yNumeric);
    currentX--;
  }

  return validPositions;
}