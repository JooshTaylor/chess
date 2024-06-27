import { XAxisPositions } from './XAxisPositions';
import { YAxisPositions } from './YAxisPositions';
import { Piece } from './pieces/Piece';

export interface Cell {
  x: XAxisPositions;
  y: YAxisPositions;

  piece?: Piece;
}