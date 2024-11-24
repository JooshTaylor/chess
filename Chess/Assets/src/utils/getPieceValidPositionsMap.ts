import { PieceColour } from "../interfaces/PieceColour";
import { PieceId } from "../interfaces/PieceId";
import { GameState } from "../reducers/GameReducer";
import { getKing } from "./getKing";
import { PiecePositionMap } from "./getPiecePositionMap";
import { getPositionId } from "./getPositionId";
import { getValidPositions } from "./getValidPositions";

function preventCastlingIfSniped(
  state: GameState,
  piecePositionMap: PiecePositionMap,
  validPositionsMap: Partial<PieceValidPositionsMap>,
  colour: PieceColour
): void {
  const king = getKing(state, colour);
  const kingPosition = piecePositionMap[king.id];
  const kingValidPositions = validPositionsMap[king.id];

  const kingSideCastlePositionId = getPositionId({ x: kingPosition.x + 2, y: kingPosition.y });
  const kingSideCastleTravelPositionId = getPositionId({ x: kingPosition.x + 1, y: kingPosition.y });
  if (kingValidPositions.has(kingSideCastlePositionId) && !kingValidPositions.has(kingSideCastleTravelPositionId)) {
    validPositionsMap[king.id].delete(kingSideCastlePositionId);
  }

  const queenSideCastlePositionId = getPositionId({ x: kingPosition.x - 2, y: kingPosition.y });
  const queenSideCastleTravelPositionId = getPositionId({ x: kingPosition.x - 1, y: kingPosition.y });
  if (kingValidPositions.has(queenSideCastlePositionId) && !kingValidPositions.has(queenSideCastleTravelPositionId)) {
    validPositionsMap[king.id].delete(queenSideCastlePositionId);
  }
}

export type PieceValidPositionsMap = Record<PieceId, Set<string>>;

export function getPieceValidPositionsMap(state: GameState, piecePositionMap: PiecePositionMap, filterUnsafeSquares: boolean): PieceValidPositionsMap {
  const map: Partial<PieceValidPositionsMap> = {};

  for (const piece of Object.values(state.pieces)) {
    if (piece.status === 'dead')
      continue;

    const validPositions = getValidPositions(state, piece, piecePositionMap, filterUnsafeSquares);
    map[piece.id] = validPositions;
  }

  /**
   * Kings are not allowed to castle if there is an opposing piece that is attacking a square
   * that the king would have to travel through to reach it's castled position. Even though 
   * the king won't end up on that travelled square, it is still illegal to castle if it's
   * under attack
   * 
   * This has to be checked after all of the valid positions are identified so that we know if the
   * travelled square is being targetted by another piece
   */
  preventCastlingIfSniped(state, piecePositionMap, map, 'white');
  preventCastlingIfSniped(state, piecePositionMap, map, 'black');

  return map as PieceValidPositionsMap;
}