import { Piece } from "../interfaces/Piece";
import { GameState } from "../reducers/GameReducer";
import { getPositionId } from "./BoardHelper";
import { getValidBishopPositions } from "./movements/getValidBishopPositions";
import { getValidKingPositions } from "./movements/getValidKingPositions";
import { getValidKnightPositions } from "./movements/getValidKnightPositions";
import { getValidPawnPositions } from "./movements/getValidPawnPositions";
import { getValidQueenPositions } from "./movements/getValidQueenPositions";
import { getValidRookPositions } from "./movements/getValidRookPositions";

export function getValidPositions(state: GameState, piece: Piece): Set<string> {
  const type = piece.promotionType || piece.type;

  switch (type) {
    case 'bishop':
      return getValidBishopPositions(piece, state);
    case 'king':
      return getValidKingPositions(piece, state);
    case 'pawn':
      return getValidPawnPositions(piece, state);
    case 'queen':
      return getValidQueenPositions(piece, state);
    case 'rook':
      return getValidRookPositions(piece, state);
    case 'knight':
      return getValidKnightPositions(piece, state);
  }
}

export function getValidPositionSet() {
  const validPositions = new Set<string>();

  return {
    validPositions,
    addValidPosition: (x: number, y: number) => validPositions.add(getPositionId({ x, y }))
  };
}