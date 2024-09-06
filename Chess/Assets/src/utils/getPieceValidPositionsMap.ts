import { PieceId } from "../interfaces/PieceId";
import { GameState } from "../reducers/GameReducer";
import { PiecePositionMap } from "./getPiecePositionMap";
import { getValidPositions } from "./getValidPositions";

export interface ValidPositionsMap {
  [position: string]: {
    isCheck: boolean;
    isCheckMate: boolean;
  }
}

export type PieceValidPositionsMap = Record<PieceId, ValidPositionsMap>;

export function getPieceValidPositionsMap(state: GameState, piecePositionMap: PiecePositionMap, filterUnsafeSquares: boolean): PieceValidPositionsMap {
  const map: Partial<PieceValidPositionsMap> = {};

  for (const piece of Object.values(state.pieces)) {
    if (piece.status === 'dead')
      continue;

    const validPositions = getValidPositions(state, piece, piecePositionMap, filterUnsafeSquares);
    map[piece.id] = validPositions;
  }

  return map as PieceValidPositionsMap;
}