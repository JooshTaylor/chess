import { Piece } from "../interfaces/Piece";
import { PieceColour } from "../interfaces/PieceColour";
import { PieceId } from "../interfaces/PieceId";
import { PieceType } from "../interfaces/PieceType";
import { Position } from "../interfaces/Position";
import { getEnPassantTargetPosition } from "../utils/getEnPassantTargetPosition";
import { getMovePieceState } from "../utils/getMovePieceState";
import { getPieceAtPosition } from "../utils/getPieceAtPosition";

type GameStatus = 'running' | 'ended';

export interface GameState {
  turnColour: PieceColour;
  selectedPiece: PieceId | '';
  pieces: Record<PieceId, Piece>;
  positions: Record<number, Record<number, PieceId | ''>>;
  status: GameStatus;
  winner?: PieceColour;
}

interface MoveActionPayload {
  currentPosition: Position;
  targetPosition: Position;
}

interface MoveAction {
  type: 'select-piece' | 'deselect-piece' | 'take-piece' | 'move-piece' | 'castle' | 'en-passant';
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

interface CheckMateActionPayload {
  winner: PieceColour;
}

interface CheckMateAction {
  type: 'check-mate';
  payload: CheckMateActionPayload;
}

export type GameAction = MoveAction | PromoteAction | CheckMateAction;

export function GameReducer(state: GameState, action: GameAction): GameState {
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
      const newState: GameState = getMovePieceState(state, getPieceAtPosition(state, currentPosition), currentPosition, targetPosition);

      return {
        ...newState,
        selectedPiece: '',
        turnColour: getNextTurnColour(newState)
      };
    }

    case 'take-piece': {
      const { currentPosition, targetPosition } = action.payload;
      const targetPiece = getPieceAtPosition(state, targetPosition);

      const newState: GameState = {
        ...state,
        pieces: {
          ...state.pieces,
          [targetPiece.id]: {
            ...targetPiece,
            status: 'dead'
          }
        }
      };

      return {
        ...newState,
        ...getMovePieceState(newState, getPieceAtPosition(state, currentPosition), currentPosition, targetPosition),
        selectedPiece: '',
        turnColour: getNextTurnColour(newState),
      };
    }

    case 'castle': {
      const { currentPosition, targetPosition } = action.payload;

      const {
        currentPosition: rookCurrentPosition,
        targetPosition: rookTargetPosition
      } = getCastlingRookPositionDetails(currentPosition, targetPosition);

      const king = getPieceAtPosition(state, currentPosition);
      const rook = getPieceAtPosition(state, rookCurrentPosition);

      return {
        ...state,
        positions: {
          ...state.positions,
          [currentPosition.x]: {
            ...state.positions[currentPosition.x],
            [currentPosition.y]: ''
          },
          [targetPosition.x]: {
            ...state.positions[targetPosition.x],
            [targetPosition.y]: king.id
          },
          [rookCurrentPosition.x]: {
            ...state.positions[rookCurrentPosition.x],
            [rookCurrentPosition.y]: ''
          },
          [rookTargetPosition.x]: {
            ...state.positions[rookTargetPosition.x],
            [rookTargetPosition.y]: rook.id
          }
        },
        pieces: {
          ...state.pieces,
          [king.id]: {
            ...king,
            ...targetPosition,
            totalMoves: 1
          },
          [rook.id]: {
            ...rook,
            ...rookTargetPosition,
            totalMoves: 1
          }
        },
        selectedPiece: '',
        turnColour: getNextTurnColour(state)
      };
    }

    case 'en-passant': {
      const { currentPosition, targetPosition } = action.payload;
      const selectedPiece = getPieceAtPosition(state, currentPosition);

      const newState: GameState = getMovePieceState(state, selectedPiece, currentPosition, targetPosition);

      const targetPiecePosition = getEnPassantTargetPosition(state.turnColour, targetPosition);
      const targetPiece = getPieceAtPosition(state, targetPiecePosition);

      newState.pieces[targetPiece.id].status = 'dead';

      return {
        ...newState,
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
            type
          }
        }
      };
    }

    case 'check-mate': {
      const { winner } = action.payload;

      return {
        ...state,
        status: 'ended',
        winner
      };
    }

    default:
      return state;
  }
}

function getCastlingRookPositionDetails(kingCurrentPosition: Position, kingTargetPosition: Position): MoveActionPayload {
  // King side castling
  if (kingCurrentPosition.x < kingTargetPosition.x) {
    return {
      currentPosition: { x: kingCurrentPosition.x + 3, y: kingCurrentPosition.y },
      targetPosition: { x: kingTargetPosition.x - 1, y: kingCurrentPosition.y }
    };
  }

  // Queen side castling
  return {
    currentPosition: { x: kingCurrentPosition.x - 4, y: kingCurrentPosition.y },
    targetPosition: { x: kingTargetPosition.x + 1, y: kingCurrentPosition.y }
  };
}