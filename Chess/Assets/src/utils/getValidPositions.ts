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
import { getPieceValidPositionsMap, ValidPositionsMap } from "./getPieceValidPositionsMap";
import { getKing } from "./getKing";
import { PieceId } from "../interfaces/PieceId";

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

export function getValidPositions(state: GameState, piece: Piece, piecePositionMap: PiecePositionMap, filterUnsafeSquares: boolean): ValidPositionsMap {
  const availableSquares = getAvailableSquares(state, piece, piecePositionMap);

  if (!filterUnsafeSquares) {
    return Array.from(availableSquares).reduce<ValidPositionsMap>((acc, square) => {
      const [ x, y ] = square.split(':');
      const position: Position = { x: Number(x), y: Number(y) };
      position;

      acc[square] = {
        isCheck: false,
        isCheckMate: false
      };

      return acc;
    }, {});
  }

  const safeSquares = new Set<string>([]);

  for (const availableSquare of availableSquares) {
    const [ x, y ] = availableSquare.split(':');
    const targetPosition: Position = { x: Number(x), y: Number(y) };

    const moveAction = getMoveAction(state, piece.id, targetPosition, piecePositionMap);

    const futureState = GameReducer(state, moveAction);
    const futurePositionsMap = getPiecePositionMap(futureState.positions);
    const futureValidPositionsMap = getPieceValidPositionsMap(futureState, futurePositionsMap, false);

    for (const [ , validPositions ] of Object.entries(futureValidPositionsMap)) {
      if (Object.values(validPositions).some(pos => pos.isCheck))
        continue;
    }

    safeSquares.add(availableSquare);
  }

  return Array.from(safeSquares).reduce<ValidPositionsMap>((acc, square) => {
    const [ x, y ] = square.split(':');
    const position: Position = { x: Number(x), y: Number(y) };

    const futureState = GameReducer(state, getMoveAction(state, piece.id, position, piecePositionMap));
    const futurePositionsMap = getPiecePositionMap(futureState.positions);
    const futureValidPositionsMap = getPieceValidPositionsMap(futureState, futurePositionsMap, false);

    const opposingKing = getKing(futureState, futureState.turnColour);
    const opposingKingPosition = futurePositionsMap[opposingKing.id];
    
    for (const pieceId in futureValidPositionsMap) {
      const validPositions = futureValidPositionsMap[pieceId as PieceId];
      const positions = Object.keys(validPositions);

      for (const position of positions) {
        const [ x, y ] = position.split(':');

        if (opposingKingPosition.x === Number(x) && opposingKingPosition.y === Number(y)) {
          acc[square] = {
            isCheck: true,
            isCheckMate: false
          };

          return acc;
        }
      }
    }

    acc[square] = {
      isCheck: false,
      isCheckMate: false
    };

    return acc;
  }, {});
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