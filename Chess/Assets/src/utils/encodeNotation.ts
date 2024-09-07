import { Piece } from "../interfaces/Piece";
import { PieceType } from "../interfaces/PieceType";
import { Position } from "../interfaces/Position";

const getPositionString = (position: Position) => `${String.fromCharCode(position.x + 96)}${position.y}`;

const PieceSectionMap: Record<PieceType, string> = {
  pawn: '',
  bishop: 'B',
  knight: 'N',
  king: 'K',
  queen: 'Q',
  rook: 'R'
};

export function encodeNotation(
  currentPosition: Position,
  targetPosition: Position,
  piece: Piece,
  isCapture: boolean,
  isCheck: boolean,
  isCheckMate: boolean
): string {
  let notation = '';

  const pieceSection = PieceSectionMap[piece.type];

  if (piece.type === 'pawn') {
    if (isCapture)
      notation += pieceSection;
  } else {
    notation += pieceSection;
  }

  if (isCapture)
    notation += 'x';

  notation += getPositionString(targetPosition);

  if (isCheckMate)
    notation += '#';

  if (isCheck && !isCheckMate)
    notation += '+';

  return notation;
}

// What if I captured?
export function encodePromotionNotation(
  targetPosition: Position,
  newType: PieceType,
  isCheck: boolean,
  isCheckMate: boolean
): string {
  let notation = '';

  notation += getPositionString(targetPosition);

  notation += '=';

  notation += PieceSectionMap[newType];

  if (isCheckMate)
    notation += '#';

  if (isCheck && !isCheckMate)
    notation += '+';

  return notation;
}