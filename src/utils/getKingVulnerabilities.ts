import { PieceColour } from "../interfaces/PieceColour";
import { GameState } from "../reducers/GameReducer";
import { getPositionId } from "./BoardHelper";
import { getValidPositions } from "./getValidPositions";

export function getKingVulnerabilities(state: GameState, colour: PieceColour): Set<string> {
  const vulnerabilities = new Set<string>([]);

  const king = state.pieces[colour === 'black' ? 'black-king' : 'white-king'];
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