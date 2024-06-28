import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";
import { bishopValidMovements } from "./BishopValidMovements";
import { rookValidMovements } from "./RookValidMovements";

export function queenValidMovements(piece: Piece, state: GameState): Set<string> {
  const validRookMovements = rookValidMovements(piece, state);
  const validBishopMovements = bishopValidMovements(piece, state);

  return new Set<string>([ ...validBishopMovements, ...validRookMovements ]);
}