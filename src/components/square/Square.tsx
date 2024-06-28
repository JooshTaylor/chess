import { ICell } from '../../interfaces/Cell';
import { Piece } from '../../interfaces/Piece';
import { convertNumberToChar } from '../../utils/BoardHelper';
import './square.css';

const getColour = (cell: ICell) => {
  // If the first in the row is white
  if (cell.y % 2 === 0)
    return cell.x % 2 === 0 ? 'black' : 'white';

  // If the first in the row is black
  return cell.x % 2 === 0 ? 'white' : 'black';
};

interface SquareProps {
  cell: ICell;
  piece: Piece;
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
      {props.cell.x === 1 && (
        <div className='label numeric-label'>
          {convertNumberToChar(props.cell.y)}
        </div>
      )}
      {props.cell.y === 1 && (
        <div className='label character-label'>
          {props.cell.x}
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