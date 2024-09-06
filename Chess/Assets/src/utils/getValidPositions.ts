import { Piece } from "../interfaces/Piece";
import { getPiecePositionMap, PiecePositionMap } from "../utils/getPiecePositionMap";
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
import { isValidPosition } from "./isValidPosition";
import { getMoveAction } from "./getMoveAction";
import { getPieceValidPositionsMap } from "./getPieceValidPositionsMap";
import { isInCheck } from "./isInCheck";

function getAvailableSquares(state: GameState, piece: Piece, piecePositionMap: PiecePositionMap): Set<string> {
  switch (piece.type) {
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

export function getValidPositions(state: GameState, piece: Piece, piecePositionMap: PiecePositionMap, filterUnsafeSquares: boolean): Set<string> {
  const availableSquares = getAvailableSquares(state, piece, piecePositionMap);

  if (!filterUnsafeSquares)
    return availableSquares;

  const safeSquares = new Set<string>([]);

  for (const availableSquare of availableSquares) {
    const [ x, y ] = availableSquare.split(':');
    const targetPosition: Position = { x: Number(x), y: Number(y) };

    const moveAction = getMoveAction(state, piece.id, targetPosition, piecePositionMap);

    const futureState = GameReducer(state, moveAction);
    const futurePositionsMap = getPiecePositionMap(futureState.positions);
    const futureValidPositionsMap = getPieceValidPositionsMap(futureState, futurePositionsMap, false);

    if (isInCheck(futureState, state.turnColour, futurePositionsMap, futureValidPositionsMap)) {
      continue;
    }

    safeSquares.add(availableSquare);
  }

  return safeSquares;
}

export function getValidPositionSet() {
  const validPositions = new Set<string>();

  return {
    validPositions,
    tryAddPosition: (
      state: GameState,
      piece: Piece,
      position: Position
    ) => {
      if (!isValidPosition(position))
        return { canContinueInDirection: false };

      const pieceAtPosition = getPieceAtPosition(state, position);

      if (!pieceAtPosition) {
        validPositions.add(getPositionId(position));
        return { canContinueInDirection: true };
      }

      if (piece.colour !== pieceAtPosition.colour)
        validPositions.add(getPositionId(position));

      return { canContinueInDirection: false };
    }
  };
}