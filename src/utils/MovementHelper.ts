import { Piece } from "../interfaces/Piece";
import { PieceType } from "../interfaces/PieceType";
import { GameState } from "../reducers/GameReducer";
import { getPositionId } from "./BoardHelper";
import { bishopValidMovements } from "./movements/BishopValidMovements";
import { kingValidMovements } from "./movements/KingValidMovements";
import { knightValidMovements } from "./movements/KnightValidMovements";
import { pawnValidMovements } from "./movements/PawnValidMovements";
import { queenValidMovements } from "./movements/QueenValidMovements";
import { rookValidMovements } from "./movements/RookValidMovements";

type GetPieceTypeFunc = (piece: Piece, state: GameState) => Set<string>;

export const ValidPositionLookups: Record<PieceType, GetPieceTypeFunc> = {
  bishop: bishopValidMovements,
  king: kingValidMovements,
  pawn: pawnValidMovements,
  queen: queenValidMovements,
  rook: rookValidMovements,
  knight: knightValidMovements
};

export function getValidPositionSet() {
  const validPositions = new Set<string>();

  return {
    validPositions,
    addValidPosition: (x: number, y: number) => validPositions.add(getPositionId({ x, y }))
  };
}