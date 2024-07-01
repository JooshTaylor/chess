import { Piece } from "../interfaces/Piece";
import { PiecePositionMap } from "../utils/getPiecePositionMap";
import { GameState } from "../reducers/GameReducer";
import { getPositionId } from "./BoardHelper";
import { getValidBishopPositions } from "./movements/getValidBishopPositions";
import { getValidKingPositions } from "./movements/getValidKingPositions";
import { getValidKnightPositions } from "./movements/getValidKnightPositions";
import { getValidPawnPositions } from "./movements/getValidPawnPositions";
import { getValidQueenPositions } from "./movements/getValidQueenPositions";
import { getValidRookPositions } from "./movements/getValidRookPositions";

export function getValidPositions(state: GameState, piece: Piece, piecePositionMap: PiecePositionMap): Set<string> {
  const type = piece.promotionType || piece.type;

  switch (type) {
    case 'bishop':
      return getValidBishopPositions(piece, state, piecePositionMap);
    case 'king':
      return getValidKingPositions(piece, state, piecePositionMap);
    case 'pawn':
      return getValidPawnPositions(piece, state, piecePositionMap);
    case 'queen':
      return getValidQueenPositions(piece, state, piecePositionMap);
    case 'rook':
      return getValidRookPositions(piece, state, piecePositionMap);
    case 'knight':
      return getValidKnightPositions(piece, state, piecePositionMap);
  }
}

export function getValidPositionSet() {
  const validPositions = new Set<string>();

  return {
    validPositions,
    addValidPosition: (x: number, y: number) => validPositions.add(getPositionId({ x, y }))
  };
}