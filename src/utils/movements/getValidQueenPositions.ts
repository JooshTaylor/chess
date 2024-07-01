import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getValidBishopPositions } from "./getValidBishopPositions";
import { getValidRookPositions } from "./getValidRookPositions";

export function getValidQueenPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap): Set<string> {
  const validRookPositions = getValidRookPositions(piece, state, piecePositionMap);
  const validBishopPositions = getValidBishopPositions(piece, state, piecePositionMap);

  return new Set<string>([ ...validBishopPositions, ...validRookPositions ]);
}