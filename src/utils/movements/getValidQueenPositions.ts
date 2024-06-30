import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";
import { getValidBishopPositions } from "./getValidBishopPositions";
import { getValidRookPositions } from "./getValidRookPositions";

export function getValidQueenPositions(piece: Piece, state: GameState): Set<string> {
  const validRookPositions = getValidRookPositions(piece, state);
  const validBishopPositions = getValidBishopPositions(piece, state);

  return new Set<string>([ ...validBishopPositions, ...validRookPositions ]);
}