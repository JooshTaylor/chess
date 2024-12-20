import { PieceColour } from "../interfaces/PieceColour";

import { GameState } from "../reducers/GameReducer";
import { PieceValidPositionsMap } from "./getPieceValidPositionsMap";

// Check mate is when the current player has zero moves they can make, and they are in check
export function isInCheckMate(state: GameState, colour: PieceColour, pieceValidPositionsMap: PieceValidPositionsMap, isInCheck: boolean): boolean {
  if (!isInCheck)
    return false;

  for (const [ pieceId, validPositions ] of Object.entries(pieceValidPositionsMap)) {
    if (state.pieces[+pieceId].colour !== colour)
      continue;

    if (validPositions.size)
      return false;
  }

  return true;
}