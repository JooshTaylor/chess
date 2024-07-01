import { GameState } from "../../reducers/GameReducer";
import { PieceColour } from "../../interfaces/PieceColour";

import './menu.css';
import { PiecePositionMap } from "../../utils/getPiecePositionMap";

function getColourString(colour: PieceColour): string {
  if (colour === 'black')
    return 'Black';

  return 'White';
}

interface MenuProps {
  state: GameState;
  piecePositionMap: PiecePositionMap;
}

export function Menu(props: MenuProps): JSX.Element {
  return (
    <div className='menu'>
      <div className='menu-contents'>
        <h2>Menu</h2>

        {props.state.status === 'ended' && (
          <div>
            Game over! {getColourString(props.state.turnColour === 'black' ? 'white' : 'black')} is the winner!
          </div>
        )}

        {/* {(isInCheck(props.state, props.state.turnColour, props.piecePositionMap) && props.state.status === 'running') && (
          <div>{getColourString(props.state.turnColour)} is in check!</div>
        )} */}
      </div>
    </div>
  );
}