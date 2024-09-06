import { GameState } from "../../reducers/GameReducer";
import { PieceColour } from "../../interfaces/PieceColour";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";

import './menu.css';

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
    <div className='menu fixed max-w-40 rounded-lg border border-chess-dark text-chess-dark bg-chess-light ms-4'>
      <div className='p-2'>
        <h2>Menu</h2>

        {props.state.status === 'ended' && (
          <div>
            Game over! {getColourString(props.state.turnColour === 'dark' ? 'light' : 'dark')} is the winner!
          </div>
        )}
      </div>
    </div>
  );
}