import { Grid } from "../../interfaces/Grid";
import { Position } from "../../interfaces/Position";
import { IQueen } from "../../interfaces/pieces/IQueen";
import { splitPosition, convertCharToNumber } from "../BoardHelper";

export function queenValidMovements(piece: IQueen, position: Position, board: Grid): Set<Position> {
  const validPositions = new Set<Position>([]);

  const [ x, y ] = splitPosition(position);

  const xNumeric = convertCharToNumber(x);
  const yNumeric = Number(y);

  console.log(xNumeric, yNumeric);

  return validPositions;
}