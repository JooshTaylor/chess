import { PieceId } from "../interfaces/Piece";
import { PieceColour } from "../interfaces/PieceColour";
import { GameState } from "../reducers/GameReducer";
import { getKing } from "./getKing";
import { PiecePositionMap } from "./getPiecePositionMap";
import { PieceValidPositionsMap } from "./getPieceValidPositionsMap";
import { getPositionId } from "./getPositionId";

export function isInCheckMate(state: GameState, colour: PieceColour, piecePositionMap: PiecePositionMap, pieceValidPositionsMap: PieceValidPositionsMap): boolean {
  const otherKing = getKing(state, colour);
  const kingPositionId = getPositionId(piecePositionMap[otherKing.id]);

  for (const [ pieceId, validPositions ] of Object.entries(pieceValidPositionsMap)) {
    if (state.pieces[pieceId as PieceId].colour === state.turnColour)
      continue;

    if (validPositions.has(kingPositionId)) {
      return true;
    }
  }

  return false;
}