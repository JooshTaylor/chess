import { PieceType } from "../interfaces/PieceType";
import { Position } from "../interfaces/Position";
import { GameState, GameAction } from "../reducers/GameReducer";
import { getPieceAtPosition } from "../utils/getPieceAtPosition";
import { PieceValidPositionsMap } from "./getPieceValidPositionsMap";

const getPositionString = (position: Position) => `${String.fromCharCode(position.x + 96)}${position.y}`;
const getCheckSection = (isCheck: boolean, isCheckMate: boolean) => {
  if (isCheckMate)
    return '#';

  if (isCheck)
    return '+';

  return '';
};
const getPromotionSection = (promotedTo: PieceType) => {
  if (!promotedTo)
    return '';

  return `=${PieceSectionMap[promotedTo]}`;
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
// TODO: Double disambiguation
export function encodeNotation(
  previousState: GameState,
  pieceValidPositionsMap: PieceValidPositionsMap,
  actionPlayed: GameAction,
  isCheck: boolean,
  isCheckMate: boolean
): string {
  switch (actionPlayed.type) {
    case 'move-piece':
    case 'take-piece':
    case 'en-passant': {
      const { currentPosition, targetPosition } = actionPlayed.payload;

      const piece = getPieceAtPosition(previousState, currentPosition);
      const targetPiece = getPieceAtPosition(previousState, targetPosition);
      
      return [
        PieceSectionMap[piece.type],
        targetPiece ? 'x' : '',
        getPositionString(targetPosition),
        getCheckSection(isCheck, isCheckMate)
      ].join('');
    }

    case 'promote-piece': {
      const { currentPosition, targetPosition, promotionType } = actionPlayed.payload;

      const piece = getPieceAtPosition(previousState, currentPosition);
      const targetPiece = getPieceAtPosition(previousState, targetPosition);

      return [
        PieceSectionMap[piece.type],
        targetPiece ? 'x' : '',
        getPositionString(targetPosition),
        getPromotionSection(promotionType),
        getCheckSection(isCheck, isCheckMate)
      ].join('');
    }

    case 'castle': {
      const { currentPosition, targetPosition } = actionPlayed.payload;

      return [
        currentPosition.x < targetPosition.x ? '0-0' : '0-0-0',
        getCheckSection(isCheck, isCheckMate)
      ].join('');
    }

    default:
      return;
  }
}