import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getValidBishopPositions } from "./getValidBishopPositions";
import { getValidRookPositions } from "./getValidRookPositions";
import { PieceValidPositionsMap } from "../getPieceValidPositionsMap";

export function getValidQueenPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap, pieceValidPositionMap: PieceValidPositionsMap): Set<string> {
  const validRookPositions = getValidRookPositions(piece, state, piecePositionMap, pieceValidPositionMap);
  const validBishopPositions = getValidBishopPositions(piece, state, piecePositionMap, pieceValidPositionMap);

  return new Set<string>([ ...validBishopPositions, ...validRookPositions ]);
}