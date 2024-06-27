import { PieceType } from "./PieceType";

export type Piece = {
  name: string;
  type: PieceType;
  colour?: 'black' | 'white';
};