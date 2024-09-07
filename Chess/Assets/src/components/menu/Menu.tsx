import { GameState } from "../../reducers/GameReducer";
import { PieceColour } from "../../interfaces/PieceColour";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";

function getColourString(colour: PieceColour): string {
  if (colour === 'dark')
    return 'Dark';

  return 'Light';
}

interface MenuProps {
  state: GameState;
  piecePositionMap: PiecePositionMap;
}

export function Menu(props: MenuProps): JSX.Element {
  return (
    <div className='w-60 max-h-[768px] min-h-[768px] rounded-lg border border-chess-dark text-chess-dark bg-chess-light ms-4 font-semibold overflow-y-scroll'>
      <div className='p-2'>
        <h2>Moves</h2>

        <ul>
          {props.state.moves.map((move, index) => {
            return (
              <li key={index}>
                {index + 1}. {move}
              </li>
            );
          })}
        </ul>

        {props.state.status === 'ended' && (
          <div>
            Game over! {getColourString(props.state.turnColour === 'dark' ? 'light' : 'dark')} is the winner!
          </div>
        )}
      </div>
    </div>
  );
}