import { EndGameComponentProps } from "../EndGameModal";

export function EndGameResign(props: EndGameComponentProps): JSX.Element {
  return (
    <div>
      {props.loser} has resigned, {props.winner} is the winner!
    </div>
  )
}