import { Grid } from "../../interfaces/Grid";
import { Position } from "../../interfaces/Position";
import { IKnight } from "../../interfaces/pieces/IKnight";
import { splitPosition, convertCharToNumber } from "../BoardHelper";

export function knightValidMovements(piece: IKnight, position: Position, board: Grid): Set<Position> {
  const validPositions = new Set<Position>([]);

  const [ x, y ] = splitPosition(position);

  const xNumeric = convertCharToNumber(x);
  const yNumeric = Number(y);

  // Top left

  // Top right

  // Right top

  // Right bottom

  // Bottom right

  // Bottom left

  // Left bottom

  // Left top

  return validPositions;
}