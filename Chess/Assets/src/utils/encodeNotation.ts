import { PieceType } from "../interfaces/PieceType";
import { Position } from "../interfaces/Position";
import { GameState, GameAction } from "../reducers/GameReducer";
import { getPieceAtPosition } from "../utils/getPieceAtPosition";

const getPositionString = (position: Position) => `${String.fromCharCode(position.x + 96)}${position.y}`;
const getCheckSection = (isCheck: boolean, isCheckMate: boolean) => {
  if (isCheckMate)
    return '#';

  if (isCheck)
    return '+';

  return '';
};

const PieceSectionMap: Record<PieceType, string> = {
  pawn: '',
  bishop: 'B',
  knight: 'N',
  king: 'K',
  queen: 'Q',
  rook: 'R'
};

// TODO: Disambiguation
export function encodeNotation(
  previousState: GameState,
  actionPlayed: GameAction,
  isCheck: boolean,
  isCheckMate: boolean
): string {
  switch (actionPlayed.type) {
    case 'move-piece': {
      const { currentPosition, targetPosition } = actionPlayed.payload;

      const piece = getPieceAtPosition(previousState, currentPosition);

      return `${PieceSectionMap[piece.type]}${getPositionString(targetPosition)}${getCheckSection(isCheck, isCheckMate)}`;
    }

    case 'take-piece':
    case 'en-passant': {
      const { currentPosition, targetPosition } = actionPlayed.payload;

      const piece = getPieceAtPosition(previousState, currentPosition);
      
      return `${PieceSectionMap[piece.type]}x${getPositionString(targetPosition)}${getCheckSection(isCheck, isCheckMate)}`;
    }

    case 'castle': {
      const { currentPosition, targetPosition } = actionPlayed.payload;
      return `${currentPosition.x < targetPosition.x ? '0-0' : '0-0-0'}${getCheckSection(isCheck, isCheckMate)}`;
    }

    default:
      return;
  }
}