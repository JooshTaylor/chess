import { PieceColour } from "../interfaces/PieceColour";
import { GameState } from "../reducers/GameReducer";
import { getPositionId } from "./BoardHelper";
import { getKing } from "./getKing";
import { getValidPositions } from "./getValidPositions";

export function getKingVulnerabilities(state: GameState, colour: PieceColour): Set<string> {
  const vulnerabilities = new Set<string>([]);

  const king = getKing(state, colour);
  const kingPositionId = getPositionId(king);

  for (const piece of Object.values(state.pieces)) {
    if (piece.colour === colour || piece.status === 'dead')
      continue;

    const validPositions = getValidPositions(state, piece);
    if (validPositions.has(kingPositionId))
      vulnerabilities.add(getPositionId(piece));
  }

  return vulnerabilities;
}