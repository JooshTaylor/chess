import { Piece } from './pieces/Piece';

export interface Cell {
  x: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
  y: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  piece?: Piece;
}