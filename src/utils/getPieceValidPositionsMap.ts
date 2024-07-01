import { PieceId } from "../interfaces/Piece";
import { GameState } from "../reducers/GameReducer";
import { PiecePositionMap } from "./getPiecePositionMap";
import { getValidPositions } from "./getValidPositions";

export interface PieceValidPositionsMap {
  pieces: Record<PieceId, Set<string>>;
  vulnerablePositions: Set<string>;
}

export function getPieceValidPositionsMap(state: GameState, piecePositionMap: PiecePositionMap): PieceValidPositionsMap {
  const map: Partial<PieceValidPositionsMap> = {};

  const vulnerablePositions = new Set<string>([]);

  for (const piece of Object.values(state.pieces)) {
    if (piece.status === 'dead')
      continue;

    const validPositions = getValidPositions(state, piece, piecePositionMap);
    map.pieces[piece.id] = validPositions;
    
    for (const pos of validPositions) {
      vulnerablePositions.add(pos);
    }
  }

  return map as PieceValidPositionsMap;
}