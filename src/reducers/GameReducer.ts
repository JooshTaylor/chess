import { Piece, PieceId } from "../interfaces/Piece";
import { PieceColour } from "../interfaces/PieceColour";
import { Position } from "../interfaces/Position";
import { getPieceAtPosition } from "../utils/BoardHelper";

export type GameActionType = 'select-piece' | 'deselect-piece' | 'take-piece' | 'move-piece';

export interface GameState {
  turnColour: PieceColour;
  selectedPiece: PieceId | '';
  pieces: Record<PieceId, Piece>;
  positions: Record<number, Record<number, PieceId | ''>>;
}

interface GameActionPayload {
  currentPosition: Position;
  targetPosition: Position;
}

interface GameAction {
  type: GameActionType;
  payload: GameActionPayload;
}

export function GameReducer(state: GameState, action: GameAction): GameState {
  const {
    currentPosition,
    targetPosition
  } = action.payload;

  function takePiece(currentState: GameState, targetPiece: Piece): GameState {
    return {
      ...currentState,
      pieces: {
        ...currentState.pieces,
        [targetPiece.id]: {
          ...targetPiece,
          status: 'dead'
        }
      }
    };
  }

  function movePiece(currentState: GameState, currentPiece: Piece): GameState {
    const newState: GameState = {
      ...currentState,
      pieces: {
        ...currentState.pieces,
        [currentPiece.id]: {
          ...currentPiece,
          ...targetPosition
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

  function getNextTurnColour(state: GameState): PieceColour {
    return state.turnColour === 'black' ? 'white' : 'black';
  }

  switch (action.type) {
    case 'select-piece': {
      return {
        ...state,
        selectedPiece: getPieceAtPosition(state, currentPosition).id
      };
    }

    case 'deselect-piece': {
      return {
        ...state,
        selectedPiece: ''
      };
    }

    case 'move-piece': {
      const newState = movePiece(state, getPieceAtPosition(state, currentPosition));
      return {
        ...newState,
        selectedPiece: '',
        turnColour: getNextTurnColour(newState)
      }
    }

    case 'take-piece': {
      const newState = takePiece(state, getPieceAtPosition(state, targetPosition));

      return {
        ...newState,
        ...movePiece(newState, getPieceAtPosition(state, currentPosition)),
        selectedPiece: '',
        turnColour: getNextTurnColour(newState)
      };
    }

    default:
      return state;
  }
}