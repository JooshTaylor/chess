import { Piece } from "../interfaces/Piece";
import { PieceId } from "../interfaces/PieceId";
import { PieceType } from "../interfaces/PieceType";
import { Position } from "../interfaces/Position";
import { GameState, GameAction } from "../reducers/GameReducer";
import { getPieceAtPosition } from "../utils/getPieceAtPosition";
import { PiecePositionMap } from "./getPiecePositionMap";
import { PieceValidPositionsMap } from "./getPieceValidPositionsMap";
import { getPositionId } from "./getPositionId";

const getXChar = (x: number) => String.fromCharCode(x + 96);

const getCheckSection = (isCheck: boolean, isCheckMate: boolean, isStalemate: boolean) => {
  if (isStalemate)
    return ' 1/2-1/2'

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

/**
 * To know if I need to disambiguate a move, I need to know:
 * 1. If any other pieces could have moved to the same position.
 * 2. If those pieces are of the same type as the one that moved.
 */
const getDisambiguationSection = (
  state: GameState,
  currentPiece: Piece,
  targetPosition: Position,
  piecePositionMap: PiecePositionMap,
  pieceValidPositionsMap: PieceValidPositionsMap
) => {
  const otherPieces: Piece[] = [];

  for (const [ pieceId, validPositions ] of Object.entries(pieceValidPositionsMap)) {
    if (pieceId === currentPiece.id)
      continue;

    const otherPiece = state.pieces[pieceId as PieceId];

    if (otherPiece.colour !== currentPiece.colour || otherPiece.type !== currentPiece.type)
      continue;

    if (validPositions.has(getPositionId(targetPosition)))
      otherPieces.push(otherPiece);
  }

  if (otherPieces.length === 1) {
    const otherPiece = otherPieces[0];

    const { x: currentX, y: currentY } = piecePositionMap[currentPiece.id];
    const { x: otherX, y: otherY } = piecePositionMap[otherPiece.id];

    if (currentX !== otherX)
      return getXChar(currentX);

    if (currentY !== otherY)
      return currentY;
  }

  if (otherPieces.length === 2) {
    const [ otherPieceOne, otherPieceTwo ] = otherPieces;
    
    const { x: currentX, y: currentY } = piecePositionMap[currentPiece.id];
    const { x: otherPieceOneX, y: otherPieceOneY } = piecePositionMap[otherPieceOne.id];
    const { x: otherPieceTwoX, y: otherPieceTwoY } = piecePositionMap[otherPieceTwo.id];

    // If the doubly disambiguous piece performed the capture, use it's starting position
    if (
      (currentX === otherPieceOneX || currentX === otherPieceTwoX) &&
      (currentY === otherPieceOneY || currentY === otherPieceTwoY)
    ) {
      return `${getXChar(currentX)}${currentY}`;
    }

    /**
     * In order to disambiguate a move where there are 3 of the same piece types
     * attacking one piece, but the doubly disambiguated piece did not perform
     * the capture, then we must find the double disambiguated piece so that
     * we can work out if we need to disambiguate the move using either the
     * file or the rank (the x or the y)
     */
    const getOtherPieceDoublyDisambiguous = () => {
      // Check other piece one
      if (
        (otherPieceOneX === currentX || otherPieceOneX === otherPieceTwoX) &&
        (otherPieceOneY === currentY || otherPieceOneY === otherPieceTwoY)
      ) return otherPieceOne;

      return otherPieceTwo;
    };

    const doublyDisambiguousPiece = getOtherPieceDoublyDisambiguous();

    const { x: doublyDisambiguousPieceX, y: doublyDisambiguousPieceY } = piecePositionMap[doublyDisambiguousPiece.id];

    if (currentX === doublyDisambiguousPieceX)
      return currentY;

    if (currentY === doublyDisambiguousPieceY)
      return getXChar(currentX);

    return '';
  }

  // Pawn captures always show the file the pawn came from
  if (currentPiece.type === 'pawn') {
    const targetPiece = getPieceAtPosition(state, targetPosition);

    if (!targetPiece)
      return '';

    const file = piecePositionMap[currentPiece.id].x;

    return getXChar(file);
  }

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

export function encodeNotation(
  previousState: GameState,
  previousPiecePositionMap: PiecePositionMap,
  previousPieceValidPositionsMap: PieceValidPositionsMap,
  actionPlayed: GameAction,
  isCheck: boolean,
  isCheckMate: boolean,
  isStalemate: boolean
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
        getDisambiguationSection(
          previousState,
          piece,
          targetPosition,
          previousPiecePositionMap,
          previousPieceValidPositionsMap
        ),
        targetPiece ? 'x' : '',
        getXChar(targetPosition.x),
        targetPosition.y,
        getCheckSection(isCheck, isCheckMate, isStalemate)
      ].join('');
    }

    case 'promote-piece': {
      const { currentPosition, targetPosition, promotionType } = actionPlayed.payload;

      const piece = getPieceAtPosition(previousState, currentPosition);
      const targetPiece = getPieceAtPosition(previousState, targetPosition);

      return [
        PieceSectionMap[piece.type],
        getDisambiguationSection(
          previousState,
          piece,
          targetPosition,
          previousPiecePositionMap,
          previousPieceValidPositionsMap
        ),
        targetPiece ? 'x' : '',
        getXChar(targetPosition.x),
        targetPosition.y,
        getPromotionSection(promotionType),
        getCheckSection(isCheck, isCheckMate, isStalemate)
      ].join('');
    }

    case 'castle': {
      const { currentPosition, targetPosition } = actionPlayed.payload;

      return [
        currentPosition.x < targetPosition.x ? '0-0' : '0-0-0',
        getCheckSection(isCheck, isCheckMate, isStalemate)
      ].join('');
    }

    default:
      return;
  }
}