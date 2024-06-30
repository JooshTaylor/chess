import { Position } from "./Position";
import { PieceColour } from "./PieceColour";
import { PieceType } from "./PieceType";

export type PieceId =
  'black-rook-1' |
  'black-knight-1' |
  'black-bishop-1' |
  'black-queen' |
  'black-king' |
  'black-bishop-2' |
  'black-knight-2' |
  'black-rook-2' |
  'black-pawn-1' |
  'black-pawn-2' |
  'black-pawn-3' |
  'black-pawn-4' |
  'black-pawn-5' |
  'black-pawn-6' |
  'black-pawn-7' |
  'black-pawn-8' |
  'white-rook-1' |
  'white-knight-1' |
  'white-bishop-1' |
  'white-queen' |
  'white-king' |
  'white-bishop-2' |
  'white-knight-2' |
  'white-rook-2' |
  'white-pawn-1' |
  'white-pawn-2' |
  'white-pawn-3' |
  'white-pawn-4' |
  'white-pawn-5' |
  'white-pawn-6' |
  'white-pawn-7' |
  'white-pawn-8';

export type PieceStatus = 'alive' | 'dead' | 'promoted';

export interface Piece extends Position {
  id: PieceId;
  type: PieceType;
  colour: PieceColour;
  status: PieceStatus;
  totalMoves: number;
  promotionType?: PieceType;
}