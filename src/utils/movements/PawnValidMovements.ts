import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";

export function pawnValidMovements(piece: Piece, state: GameState): Set<string> {
  const validPositions = new Set<string>([]);

  return validPositions;
}