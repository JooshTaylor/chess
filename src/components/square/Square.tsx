import { Cell } from '../../interfaces/Cell';
import './square.css';

const getColour = (cell: Cell) => {
  const y = +cell.y;
  const charCode = cell.x.charCodeAt(0);

  // If the first in the row is white
  if (y % 2 === 0)
    return charCode % 2 === 0 ? 'black' : 'white';

  // If the first in the row is black
  return charCode % 2 === 0 ? 'white' : 'black';
};

interface SquareProps {
  cell: Cell;
  onSelect: () => void;
  isSelected: boolean;
}

export function Square(props: SquareProps): JSX.Element {
  function getClassName(): string {
    let className = `square ${getColour(props.cell)}`;

    if (props.isSelected)
      className += ' selected-square';

    return className;
  }

  return (
    <div className={getClassName()} onClick={props.onSelect}>
      {props.cell.x === 'a' && (
        <div className='label numeric-label'>
          {props.cell.y}
        </div>
      )}
      {props.cell.y === '1' && (
        <div className='label character-label'>
          {props.cell.x}
        </div>
      )}

      {!!props.cell.piece && (
        <div className={`piece ${props.cell.piece?.colour === 'black' ? 'piece-black' : 'piece-white'}`}>
          {props.cell.piece?.name}
        </div>
      )}
    </div>
  );
}