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
        totalMoves: currentPiece.totalMoves + 1
      }
    }
  };

  const newPositions: GameState['positions'] = {
    ...currentState.positions,
    [currentPosition.y]: {
      ...currentState.positions[currentPosition.y],
      [currentPosition.x]: ''
    }
  }

  newPositions[targetPosition.y] = {
    ...newPositions[targetPosition.y],
    [targetPosition.x]: currentPiece.id
  };

  newState.positions = newPositions;

  return newState;
}