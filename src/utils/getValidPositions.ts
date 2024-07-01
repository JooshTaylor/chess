import { Piece } from "../interfaces/Piece";
import { PiecePositionMap } from "../utils/getPiecePositionMap";
import { GameReducer, GameState } from "../reducers/GameReducer";
import { getValidBishopPositions } from "./movements/getValidBishopPositions";
import { getValidKingPositions } from "./movements/getValidKingPositions";
import { getValidKnightPositions } from "./movements/getValidKnightPositions";
import { getValidPawnPositions } from "./movements/getValidPawnPositions";
import { getValidQueenPositions } from "./movements/getValidQueenPositions";
import { getValidRookPositions } from "./movements/getValidRookPositions";
import { Position } from "../interfaces/Position";
import { getPieceAtPosition } from "./getPieceAtPosition";
import { getPositionId } from "./getPositionId";
import { getMoveAction } from "./getMoveAction";
import { isInCheck } from "./isInCheck";
import { PieceValidPositionsMap } from "./getPieceValidPositionsMap";

export function getValidPositions(state: GameState, piece: Piece, piecePositionMap: PiecePositionMap, pieceValidPositionMap: PieceValidPositionsMap): Set<string> {
  const type = piece.promotionType || piece.type;

  switch (type) {
    case 'bishop':
      return getValidBishopPositions(piece, state, piecePositionMap, pieceValidPositionMap);
    case 'king':
      return getValidKingPositions(piece, state, piecePositionMap, pieceValidPositionMap);
    case 'pawn':
      return getValidPawnPositions(piece, state, piecePositionMap, pieceValidPositionMap);
    case 'queen':
      return getValidQueenPositions(piece, state, piecePositionMap, pieceValidPositionMap);
    case 'rook':
      return getValidRookPositions(piece, state, piecePositionMap, pieceValidPositionMap);
    case 'knight':
      return getValidKnightPositions(piece, state, piecePositionMap, pieceValidPositionMap);
  }
}

export function getValidPositionSet() {
  const validPositions = new Set<string>();

  return {
    validPositions,
    tryAddPosition: (
      state: GameState,
      piece: Piece,
      position: Position,
      piecePositionMap: PiecePositionMap,
      pieceValidPositionMap: PieceValidPositionsMap,
      checkKingVulnerability: boolean = false,
      cannotTake: boolean = false
    ) => {
      if (position.x < 1 || position.y < 1 && position.x > 8 && position.y > 8)
        return { canContinueInDirection: false };

      // If at the end of my move, my king is in a vulnerable position, the move is illegal

      const pieceAtPosition = getPieceAtPosition(state, position);

      if (!pieceAtPosition) {
        if (checkKingVulnerability) {
          const futureState = GameReducer(state, getMoveAction(state, piecePositionMap, pieceValidPositionMap, position));
  
          if (isInCheck(futureState, state.turnColour))
            return { canContinueInDirection: true };
        }

        validPositions.add(getPositionId(position));
        return { canContinueInDirection: true };
      }

      if (!cannotTake && piece.colour !== pieceAtPosition.colour) {
        if (checkKingVulnerability) {
          const futureState = GameReducer(state, getMoveAction(state, piecePositionMap, pieceValidPositionMap, position));
  
          if (isInCheck(futureState, state.turnColour))
            return { canContinueInDirection: true };
        }

        validPositions.add(getPositionId(position));
      }

      return { canContinueInDirection: false };
    }
  };
}