import { Grid } from "../../interfaces/Grid";
import { Position } from "../../interfaces/Position";
import { IQueen } from "../../interfaces/pieces/IQueen";
import { bishopValidMovements } from "./BishopValidMovements";
import { rookValidMovements } from "./RookValidMovements";

export function queenValidMovements(piece: IQueen, position: Position, board: Grid): Set<Position> {
  const validRookMovements = rookValidMovements(piece, position, board);
  const validBishopMovements = bishopValidMovements(piece, position, board);

  return new Set<Position>([ ...validBishopMovements, ...validRookMovements ]);
}