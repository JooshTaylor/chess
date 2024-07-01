import { PieceColour } from "../interfaces/PieceColour";
import { PiecePositionMap } from "../utils/getPiecePositionMap";
import { GameState } from "../reducers/GameReducer";
import { getPositionId } from "./BoardHelper";
import { getKing } from "./getKing";
import { getValidPositions } from "./getValidPositions";

export function getKingVulnerabilities(state: GameState, colour: PieceColour, piecePositionMap: PiecePositionMap): Set<string> {
  const vulnerabilities = new Set<string>([]);

  const king = getKing(state, colour);
  const kingPositionId = getPositionId(piecePositionMap[king.id]);

  for (const piece of Object.values(state.pieces)) {
    if (piece.colour === colour || piece.status === 'dead')
      continue;

    const validPositions = getValidPositions(state, piece, piecePositionMap);
    if (validPositions.has(kingPositionId))
      vulnerabilities.add(getPositionId(piecePositionMap[piece.id]));
  }

  return vulnerabilities;
}