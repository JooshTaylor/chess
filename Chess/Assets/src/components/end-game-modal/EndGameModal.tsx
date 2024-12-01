import { GameEnding } from "../../interfaces/GameEnding";
import { PieceColour } from "../../interfaces/PieceColour";
import { Modal } from "../modal/Modal";
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
const EndGameComponents: Record<GameEnding, (props: EndGameComponentProps) => JSX.Element> = {
  'checkmate': EndGameCheckMate,
  'stalemate': EndGameStalemate,
  'resignation': EndGameResign,
  'timeout': EndGameTimeOut,
  'insufficient-material': EndGameDraw,
  'timeout-vs-insufficient-material': EndGameDraw
};

interface EndGameModalProps {
  result: GameEnding;
  winner: PieceColour;
}

export function EndGameModal(props: EndGameModalProps): JSX.Element {
  const Component = EndGameComponents[props.result];

  const loser = props.winner ? (props.winner === 'black' ? 'white' : 'black') : null;

  return (
    <Modal title={`Game over`}>
      <Component winner={props.winner} loser={loser} />
    </Modal>
  )
}