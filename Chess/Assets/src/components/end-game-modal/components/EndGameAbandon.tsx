import { EndGameComponentProps } from "../EndGameModal";

export function EndGameAbandon(props: EndGameComponentProps): JSX.Element {
  return (
    <div>
      {props.loser} has abandoned, {props.winner} is the winner!
    </div>
  )
}