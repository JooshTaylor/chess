import { Piece } from '../../interfaces/Piece';
import { PieceColour } from '../../interfaces/PieceColour';
import { Position } from '../../interfaces/Position';
import './square.css';

function getColour(position: Position): PieceColour {
  // If the first in the row is white
  if (position.y % 2 === 0)
    return position.x % 2 === 0 ? 'black' : 'white';

  // If the first in the row is black
  return position.x % 2 === 0 ? 'white' : 'black';
}

function convertNumberToChar(num: number): string {
  return String.fromCharCode(num + 96);
}

interface SquareProps {
  position: Position;
  piece: Piece;
  onSelect: () => void;
  isSelected: boolean;
  disabled: boolean;
}

export function Square(props: SquareProps): JSX.Element {
  function getClassName(): string {
    let className = `square ${getColour(props.position)}`;

    if (props.isSelected)
      className += ' selected-square';

    if (props.disabled)
      className += ' disabled';

    return className;
  }

  function onSelect(): void {
    if (props.disabled)
      return;

    props.onSelect();
  }

  return (
    <div className={getClassName()} onClick={onSelect}>
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
        <div className={`piece ${props.piece.colour === 'black' ? 'piece-black' : 'piece-white'}`}>
          {props.piece.id} {props.piece.type !== props.piece.originalType ? `as ${props.piece.type}` : ''}
        </div>
      )}
    </div>
  );
}