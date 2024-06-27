import { Grid } from "../../interfaces/Grid";
import { Position } from "../../interfaces/Position";
import { splitPosition, convertCharToNumber, convertNumberToChar } from "../BoardHelper";

export function bishopValidMovements(position: Position, board: Grid): Set<Position> {
  const validPositions = new Set<Position>([]);

  const [ x, y ] = splitPosition(position);

  const xNumeric = convertCharToNumber(x);
  const yNumeric = Number(y);

  // Top left
  let currentX = xNumeric - 1;
  let currentY = yNumeric + 1;

  while (currentX > 0 && currentY < 9) {
    validPositions.add(`${convertNumberToChar(currentX)}:${currentY}`);

    currentX--;
    currentY++;
  }

  // Top right
  currentX = xNumeric + 1
  currentY = yNumeric + 1

  while (currentX < 9 && currentY < 9) {
    validPositions.add(`${convertNumberToChar(currentX)}:${currentY}`);

    currentX++;
    currentY++;
  }

  // Bottom right
  currentX = xNumeric + 1;
  currentY = yNumeric - 1;

  while (currentX < 9 && currentY > 0) {
    validPositions.add(`${convertNumberToChar(currentX)}:${currentY}`);

    currentX++;
    currentY--;
  }

  // Bottom left
  currentX = xNumeric - 1;
  currentY = yNumeric - 1;

  while (currentX > 0 && currentY > 0) {
    validPositions.add(`${convertNumberToChar(currentX)}:${currentY}`);

    currentX--;
    currentY--;
  }

  return validPositions;
}