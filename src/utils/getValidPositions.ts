import { Piece } from "../interfaces/Piece";
import { PiecePositionMap } from "../utils/getPiecePositionMap";
import { GameState } from "../reducers/GameReducer";
import { getValidBishopPositions } from "./movements/getValidBishopPositions";
import { getValidKingPositions } from "./movements/getValidKingPositions";
import { getValidKnightPositions } from "./movements/getValidKnightPositions";
import { getValidPawnPositions } from "./movements/getValidPawnPositions";
import { getValidQueenPositions } from "./movements/getValidQueenPositions";
import { getValidRookPositions } from "./movements/getValidRookPositions";
import { Position } from "../interfaces/Position";
import { getPieceAtPosition } from "./getPieceAtPosition";
import { getPositionId } from "./getPositionId";

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
    tryAddPosition: (state: GameState, piece: Piece, position: Position, cannotTake: boolean = false) => {
      if (position.x < 1 || position.y < 1 && position.x > 8 && position.y > 8)
        return { canContinueInDirection: false };

      const pieceAtPosition = getPieceAtPosition(state, position);

      if (!pieceAtPosition) {
        validPositions.add(getPositionId(position));
        return { canContinueInDirection: true };
      }

      if (!cannotTake && piece.colour !== pieceAtPosition.colour)
        validPositions.add(getPositionId(position));

      return { canContinueInDirection: false };
    }
  };
}