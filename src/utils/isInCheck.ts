import { PieceColour } from "../interfaces/PieceColour";
import { GameState } from "../reducers/GameReducer";
import { getKing } from "./getKing";
import { getPiecePositionMap } from "./getPiecePositionMap";
import { getPieceValidPositionsMap } from "./getPieceValidPositionsMap";
import { getPositionId } from "./getPositionId";

export function isInCheck(state: GameState, colour: PieceColour): boolean {
  const piecePositionMap = getPiecePositionMap(state.positions);
  const pieceValidPositionMap = getPieceValidPositionsMap(state, piecePositionMap);

  const king = getKing(state, colour);
  const kingPositionId = getPositionId(piecePositionMap[king.id]);

  return pieceValidPositionMap.vulnerablePositions.has(kingPositionId);
}