import { GameEnding } from "./GameEnding";
import { GameStatus } from "../enums/GameStatus";
import { PieceColour } from "./PieceColour";
import { TimeControl } from "./TimeControl";
import { PieceType } from "./PieceType";
import { PieceStatus } from "./PieceStatus";

interface BasePiece {
  type: PieceType;
  colour: PieceColour;
  initialX: 2;
  initialY: 2;
}

interface GamePiece {
  id: number,
  piece: BasePiece;
  x: number;
  y: number;
  promotionType: PieceType;
  totalMoves: number;
  status: PieceStatus;
}

interface GameMove {
  id: number;
}

export interface Game {
  id: number;
  status: GameStatus;
  ending: GameEnding;
  winner: PieceColour;
  timeControl: TimeControl;

  // TODO: Consolidate this with the other Piece interface
  pieces: GamePiece[];
  moves: GameMove[];

  playerOneId: string;
  playerTwoId: string;
}