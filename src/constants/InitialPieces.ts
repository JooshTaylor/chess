import { Position } from '../interfaces/Position';
import { Piece } from '../interfaces/pieces/Piece';
import { Bishop } from './pieces/Bishop';
import { King } from './pieces/King';
import { Knight } from './pieces/Knight';
import { Pawn } from './pieces/Pawn';
import { Queen } from './pieces/Queen';
import { Rook } from './pieces/Rook';

export const InitialPieces: Record<Position, Piece> = {
  'a:8': { ...Rook, colour: 'black' },
  'b:8': { ...Knight, colour: 'black' },
  'c:8': { ...Bishop, colour: 'black' },
  'd:8': { ...Queen, colour: 'black' },
  'e:8': { ...King, colour: 'black' },
  'f:8': { ...Bishop, colour: 'black' },
  'g:8': { ...Knight, colour: 'black' },
  'h:8': { ...Rook, colour: 'black' },
  'a:7': { ...Pawn, colour: 'black' },
  'b:7': { ...Pawn, colour: 'black' },
  'c:7': { ...Pawn, colour: 'black' },
  'd:7': { ...Pawn, colour: 'black' },
  'e:7': { ...Pawn, colour: 'black' },
  'f:7': { ...Pawn, colour: 'black' },
  'g:7': { ...Pawn, colour: 'black' },
  'h:7': { ...Pawn, colour: 'black' },

  'a:1': { ...Rook, colour: 'white' },
  'b:1': { ...Knight, colour: 'white' },
  'c:1': { ...Bishop, colour: 'white' },
  'd:1': { ...Queen, colour: 'white' },
  'e:1': { ...King, colour: 'white' },
  'f:1': { ...Bishop, colour: 'white' },
  'g:1': { ...Knight, colour: 'white' },
  'h:1': { ...Rook, colour: 'white' },
  'a:2': { ...Pawn, colour: 'white' },
  'b:2': { ...Pawn, colour: 'white' },
  'c:2': { ...Pawn, colour: 'white' },
  'd:2': { ...Pawn, colour: 'white' },
  'e:2': { ...Pawn, colour: 'white' },
  'f:2': { ...Pawn, colour: 'white' },
  'g:2': { ...Pawn, colour: 'white' },
  'h:2': { ...Pawn, colour: 'white' },
};