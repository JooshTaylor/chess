import { EndGameComponentProps } from "../EndGameModal";

export function EndGameTimeOut(props: EndGameComponentProps): JSX.Element {
  return (
    <div>
      {props.loser} has run out of time, {props.winner} is the winner!
    </div>
  )
}