import { Piece } from "../interfaces/Piece";

import { Position } from "../interfaces/Position";
import { GameState } from "../reducers/GameReducer";

export function getMovePieceState(
  currentState: GameState,
  currentPiece: Piece,
  currentPosition: Position,
  targetPosition: Position
): GameState {
  const newState: GameState = {
    ...currentState,
    pieces: {
      ...currentState.pieces,
      [currentPiece.id]: {
        ...currentPiece,
        ...targetPosition,
        totalMoves: currentPiece.totalMoves + 1,
        turnsSinceLastMove: -1
      }
    }
  };

  newState.pieces = Object.entries(newState.pieces).reduce<Record<number, Piece>>((acc, [ pieceId, piece ]) => {
    acc[+pieceId] = {
      ...piece,
      turnsSinceLastMove: piece.turnsSinceLastMove + 1
    };
    return acc;
  }, {} as Record<number, Piece>);

  const newPositions: GameState['positions'] = {
    ...currentState.positions,
    [currentPosition.x]: {
      ...currentState.positions[currentPosition.x],
      [currentPosition.y]: ''
    }
  }

  newPositions[targetPosition.x] = {
    ...newPositions[targetPosition.x],
    [targetPosition.y]: currentPiece.id
  };

  newState.positions = newPositions;

  return newState;
}