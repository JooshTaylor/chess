
import { PieceColour } from "../interfaces/PieceColour";
import { GameState } from "../reducers/GameReducer";
import { getKing } from "./getKing";
import { PiecePositionMap } from "./getPiecePositionMap";
import { PieceValidPositionsMap } from "./getPieceValidPositionsMap";
import { getPositionId } from "./getPositionId";

export function isInCheck(state: GameState, colour: PieceColour, piecePositionMap: PiecePositionMap, pieceValidPositionsMap: PieceValidPositionsMap): boolean {
  const targettedKing = getKing(state, colour);

  // First we need to know the position of the king for the colour we are checking
  const kingPositionId = getPositionId(piecePositionMap[targettedKing.id]);

  // Then, we need to know all of the valid moves for pieces of the opposite colour
  for (const [ pieceId, validPositions ] of Object.entries(pieceValidPositionsMap)) {
    if (state.pieces[+pieceId].colour === colour)
      continue;

    // If any piece has a legal move that targets the king, then we are in check.
    if (validPositions.has(kingPositionId)) {
      return true;
    }
  }

  return false;
}