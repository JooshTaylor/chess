import { EndGameComponentProps } from "../EndGameModal";

export function EndGameCheckMate(props: EndGameComponentProps): JSX.Element {
  return (
    <div>
      {props.winner} is the winner!
    </div>
  )
}