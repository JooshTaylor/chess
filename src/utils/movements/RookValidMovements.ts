import { Grid } from "../../interfaces/Grid";
import { Position } from "../../interfaces/Position";
import { splitPosition, convertCharToNumber } from "../BoardHelper";

export function rookValidMovements(position: Position, board: Grid): Set<Position> {
  const validPositions = new Set<Position>([]);

  const [ x, y ] = splitPosition(position);

  const xNumeric = convertCharToNumber(x);
  const yNumeric = Number(y);

  console.log(xNumeric, yNumeric);

  return validPositions;
}