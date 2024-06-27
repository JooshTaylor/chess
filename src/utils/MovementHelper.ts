import { Grid } from "../interfaces/Grid";
import { Position } from "../interfaces/Position";
import { Piece } from "../interfaces/pieces/Piece";
import { PieceType } from "../interfaces/pieces/PieceType";
import { bishopValidMovements } from "./movements/BishopValidMovements";
import { kingValidMovements } from "./movements/KingValidMovements";
import { knightValidMovements } from "./movements/KnightValidMovements";
import { pawnValidMovements } from "./movements/PawnValidMovements";
import { queenValidMovements } from "./movements/QueenValidMovements";
import { rookValidMovements } from "./movements/RookValidMovements";

type GetPieceTypeFunc = (piece: Piece, position: Position, board: Grid) => Set<Position>;

export const ValidPositionLookups: Record<PieceType, GetPieceTypeFunc> = {
  bishop: bishopValidMovements,
  king: kingValidMovements,
  pawn: pawnValidMovements,
  queen: queenValidMovements,
  rook: rookValidMovements,
  knight: knightValidMovements
};

const AllPiecesSet = new Set<PieceType>([ 'knight', 'queen', 'king', 'bishop', 'pawn', 'rook' ]);

export const CanTakeLookups: Record<PieceType, Set<PieceType>> = {
  bishop: AllPiecesSet,
  king: new Set([]),
  pawn: new Set([]),
  queen: AllPiecesSet,
  rook: AllPiecesSet,
  knight: AllPiecesSet
}