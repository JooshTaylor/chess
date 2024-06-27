import { Grid } from "../../interfaces/Grid";
import { Position } from "../../interfaces/Position";
import { IRook } from "../../interfaces/pieces/IRook";
import { splitPosition, convertCharToNumber } from "../BoardHelper";

export function rookValidMovements(piece: IRook, position: Position, board: Grid): Set<Position> {
  const validPositions = new Set<Position>([]);

  const [ x, y ] = splitPosition(position);

  const xNumeric = convertCharToNumber(x);
  const yNumeric = Number(y);

  console.log(xNumeric, yNumeric);

  return validPositions;
}