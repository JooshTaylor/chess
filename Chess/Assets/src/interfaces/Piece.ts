import { PieceColour } from "./PieceColour";
import { PieceStatus } from "./PieceStatus";
import { PieceType } from "./PieceType";

export interface Piece {
  // The ID for the piece
  id: number;

  // The current type the piece is playing as
  type: PieceType;

  // The original type the piece was. For cases where a pawn is promoted to another piece
  originalType: PieceType;

  // The piece's colour
  colour: PieceColour;

  // The piece's status (e.g. dead or alive)
  status: PieceStatus;

  // How many moves the piece has made
  totalMoves: number;

  // How many turns have passed since the last time this piece made a move
  turnsSinceLastMove: number;
}