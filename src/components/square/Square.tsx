import { Piece } from '../../interfaces/Piece';
import { Position } from '../../interfaces/Position';
import { convertNumberToChar } from '../../utils/BoardHelper';
import './square.css';

const getColour = (position: Position) => {
  // If the first in the row is white
  if (position.y % 2 === 0)
    return position.x % 2 === 0 ? 'black' : 'white';

  // If the first in the row is black
  return position.x % 2 === 0 ? 'white' : 'black';
};

interface SquareProps {
  position: Position;
  piece: Piece;
  onSelect: () => void;
  isSelected: boolean;
}

export function Square(props: SquareProps): JSX.Element {
  function getClassName(): string {
    let className = `square ${getColour(props.position)}`;

    if (props.isSelected)
      className += ' selected-square';

    return className;
  }

  return (
    <div className={getClassName()} onClick={props.onSelect}>
      {props.position.x === 1 && (
        <div className='label numeric-label'>
          {convertNumberToChar(props.position.y)}
        </div>
      )}
      {props.position.y === 1 && (
        <div className='label character-label'>
          {props.position.x}
        </div>
      )}

      {!!props.piece && (
        <div className={`piece ${props.piece?.colour === 'black' ? 'piece-black' : 'piece-white'}`}>
          {props.piece?.id}
        </div>
      )}
    </div>
  );
}