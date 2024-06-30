import React from "react";
import { GameState } from "../../reducers/GameReducer";
import { getKingVulnerabilities } from "../../utils/getKingVulnerabilities";

import './menu.css';

interface MenuProps {
  state: GameState;
}

export function Menu(props: MenuProps): JSX.Element {
  const isInCheck = React.useMemo(() => {
    return getKingVulnerabilities(props.state, props.state.turnColour).size > 0;
  }, [props.state]);

  const colourString = props.state.turnColour === 'black' ? 'Black' : 'White';

  return (
    <div className='menu'>
      <div className='menu-contents'>
        <h2>Menu</h2>
        {isInCheck && <div>{colourString} is in check!</div>}
      </div>
    </div>
  );
}