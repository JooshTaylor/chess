import { GameEnding } from "./GameEnding";
import { GameStatus } from "./GameStatus";
import { PieceColour } from "./PieceColour";
import { TimeControl } from "./TimeControl";

export interface Game {
  id: number;

  status: GameStatus;
  ending: GameEnding;
  winner: PieceColour;

  timeRemainingWhite: number;
  timeRemainingBlack: number;
  timeControl: TimeControl;
}