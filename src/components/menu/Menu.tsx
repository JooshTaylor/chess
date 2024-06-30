import React from "react";
import { GameState } from "../../reducers/GameReducer";
import { getKingVulnerabilities } from "../../utils/getKingVulnerabilities";

import './menu.css';
import { PieceColour } from "../../interfaces/PieceColour";

function getColourString(colour: PieceColour): string {
  if (colour === 'black')
    return 'Black';

  return 'White';
}

interface MenuProps {
  state: GameState;
}

export function Menu(props: MenuProps): JSX.Element {
  const isInCheck = React.useMemo(() => {
    return getKingVulnerabilities(props.state, props.state.turnColour).size > 0;
  }, [props.state]);

  return (
    <div className='menu'>
      <div className='menu-contents'>
        <h2>Menu</h2>

        {props.state.status === 'ended' && (
          <div>
            Game over! {getColourString(props.state.turnColour === 'black' ? 'white' : 'black')} is the winner!
          </div>
        )}

        {(isInCheck && props.state.status === 'running') && <div>{getColourString(props.state.turnColour)} is in check!</div>}
      </div>
    </div>
  );
}