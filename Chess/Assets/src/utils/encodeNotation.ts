import { Piece } from "../interfaces/Piece";
import { PieceType } from "../interfaces/PieceType";
import { Position } from "../interfaces/Position";

const getXPosition = (x: number) => String.fromCharCode(x + 96);

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
  isCheckMate: boolean,
  isCastle: boolean
): string {
  if (isCastle) {
    if (currentPosition.x < targetPosition.x)
      return '0-0';

    return '0-0-0';
  }

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

  notation += `${getXPosition(targetPosition.x)}${targetPosition.y}`;

  if (isCheck)
    notation += '+';


  return notation;
}