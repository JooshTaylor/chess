import { PieceId } from "../interfaces/Piece";
import { GameState } from "../reducers/GameReducer";
import { PiecePositionMap } from "./getPiecePositionMap";
import { getValidPositions } from "./getValidPositions";

export type PieceValidPositionsMap = Record<PieceId, Set<string>>;

export function getPieceValidPositionsMap(state: GameState, piecePositionMap: PiecePositionMap): PieceValidPositionsMap {
  const map: Partial<PieceValidPositionsMap> = {};

  for (const piece of Object.values(state.pieces)) {
    if (piece.status === 'dead')
      continue;

    const validPositions = getValidPositions(state, piece, piecePositionMap);
    map[piece.id] = validPositions;
  }

  return map as PieceValidPositionsMap;
}