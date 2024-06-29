import { Piece, PieceId } from "../interfaces/Piece";
import { PieceColour } from "../interfaces/PieceColour";
import { PieceType } from "../interfaces/PieceType";
import { Position } from "../interfaces/Position";
import { getPieceAtPosition } from "../utils/BoardHelper";

export interface GameState {
  turnColour: PieceColour;
  selectedPiece: PieceId | '';
  pieces: Record<PieceId, Piece>;
  positions: Record<number, Record<number, PieceId | ''>>;
}

interface MoveActionPayload {
  currentPosition: Position;
  targetPosition: Position;
}

interface MoveAction {
  type: 'select-piece' | 'deselect-piece' | 'take-piece' | 'move-piece';
  payload: MoveActionPayload;
}

interface PromoteActionPayload {
  pieceId: PieceId;
  type: PieceType;
}

interface PromoteAction {
  type: 'promote-piece';
  payload: PromoteActionPayload;
}

type GameAction = MoveAction | PromoteAction;

export function GameReducer(state: GameState, action: GameAction): GameState {
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

  function movePiece(
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
        selectedPiece: getPieceAtPosition(state, action.payload.currentPosition).id
      };
    }

    case 'deselect-piece': {
      return {
        ...state,
        selectedPiece: ''
      };
    }

    case 'move-piece': {
      const { currentPosition, targetPosition } = action.payload;
      const newState = movePiece(state, getPieceAtPosition(state, currentPosition), currentPosition, targetPosition);

      return {
        ...newState,
        selectedPiece: '',
        turnColour: getNextTurnColour(newState)
      }
    }

    case 'take-piece': {
      const { currentPosition, targetPosition } = action.payload;
      const newState = takePiece(state, getPieceAtPosition(state, targetPosition));

      return {
        ...newState,
        ...movePiece(newState, getPieceAtPosition(state, currentPosition), currentPosition, targetPosition),
        selectedPiece: '',
        turnColour: getNextTurnColour(newState)
      };
    }

    case 'promote-piece': {
      const { pieceId, type } = action.payload;

      return {
        ...state,
        pieces: {
          ...state.pieces,
          [pieceId]: {
            ...state.pieces[pieceId],
            promotionType: type
          }
        }
      };
    }

    default:
      return state;
  }
}