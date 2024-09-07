import { PieceColour } from "../../interfaces/PieceColour";
import { GameResult } from "../../reducers/GameReducer";
import { Modal } from "../modal/Modal";
import { EndGameAbandon } from "./components/EndGameAbandon";
import { EndGameCheckMate } from "./components/EndGameCheckMate";
import { EndGameDraw } from "./components/EndGameDraw";
import { EndGameResign } from "./components/EndGameResign";
import { EndGameStalemate } from "./components/EndGameStalemate";
import { EndGameTimeOut } from "./components/EndGameTimeOut";

export interface EndGameComponentProps {
  winner: PieceColour | null;
  loser: PieceColour | null;
}

// TODO: Implement all of these
const EndGameComponents: Record<GameResult, (props: EndGameComponentProps) => JSX.Element> = {
  'check-mate': EndGameCheckMate,
  'stalemate': EndGameStalemate,
  'abandon': EndGameAbandon,
  'draw': EndGameDraw,
  'resign': EndGameResign,
  'time-out': EndGameTimeOut,
};

interface EndGameModalProps {
  result: GameResult;
  winner: PieceColour;
}

export function EndGameModal(props: EndGameModalProps): JSX.Element {
  const Component = EndGameComponents[props.result];

  const loser = props.winner ? (props.winner === 'dark' ? 'light' : 'dark') : null;

  return (
    <Modal title={`Game over`}>
      <Component winner={props.winner} loser={loser} />
    </Modal>
  )
}