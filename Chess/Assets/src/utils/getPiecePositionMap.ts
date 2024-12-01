
import { Position } from "../interfaces/Position";
import { GameState } from "../reducers/GameReducer";

export type PiecePositionMap = Record<number, Position>;

export function getPiecePositionMap(positions: GameState['positions']): PiecePositionMap {
  const map: Partial<PiecePositionMap> = {};

  for (const x in positions) {
    for (const y in positions[x]) {
      const pieceId = positions[x][y];

      if (!pieceId)
        continue;

      map[pieceId] = { x: Number(x), y: Number(y) };
    }
  }

  return map as PiecePositionMap;
}