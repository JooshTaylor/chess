import { GameEnding } from "./GameEnding";
import { GameStatus } from "../enums/GameStatus";
import { PieceColour } from "./PieceColour";
import { TimeControl } from "./TimeControl";

export interface Game {
  id: number;
  status: GameStatus;
  ending: GameEnding;
  winner: PieceColour;
  timeControl: TimeControl;
  playerOneId: string;
  playerTwoId: string;
}