import { Grid } from "../interfaces/Grid";
import { Position } from "../interfaces/Position";
import { PieceType } from "../interfaces/pieces/PieceType";
import { bishopValidMovements } from "./movements/BishopValidMovements";
import { kingValidMovements } from "./movements/KingValidMovements";
import { knightValidMovements } from "./movements/KnightValidMovements";
import { pawnValidMovements } from "./movements/PawnValidMovements";
import { queenValidMovements } from "./movements/QueenValidMovements";
import { rookValidMovements } from "./movements/RookValidMovements";

type GetPieceTypeFunc = (position: Position, board: Grid) => Set<Position>;

export const ValidPositionLookups: Record<PieceType, GetPieceTypeFunc> = {
  bishop: bishopValidMovements,
  king: kingValidMovements,
  pawn: pawnValidMovements,
  queen: queenValidMovements,
  rook: rookValidMovements,
  knight: knightValidMovements
};