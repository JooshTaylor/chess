import { PieceColour } from "../interfaces/PieceColour";
import { PieceId } from "../interfaces/PieceId";
import { GameState } from "../reducers/GameReducer";
import { PieceValidPositionsMap } from "./getPieceValidPositionsMap";

export function isInCheckMate(state: GameState, colour: PieceColour, pieceValidPositionsMap: PieceValidPositionsMap): boolean {
  for (const [ pieceId, validPositions ] of Object.entries(pieceValidPositionsMap)) {
    const piece = state.pieces[pieceId as PieceId];

    if (piece.colour !== colour)
      continue;
    
    if (validPositions.size)
      return false;
  }

  return true;
}