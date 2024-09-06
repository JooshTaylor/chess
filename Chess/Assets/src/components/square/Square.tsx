import { PieceComponentMap } from '../../constants/PieceComponentMap';
import { Piece } from '../../interfaces/Piece';
import { Position } from '../../interfaces/Position';

function getColour(position: Position): string {
  // If the first in the row is light
  if (position.y % 2 === 0)
    return position.x % 2 === 0 ? 'bg-chess-dark' : 'bg-chess-light';

  // If the first in the row is dark
  return position.x % 2 === 0 ? 'bg-chess-light' : 'bg-chess-dark';
}

function convertNumberToChar(num: number): string {
  return String.fromCharCode(num + 96);
}

interface SquareProps {
  position: Position;
  piece: Piece;
  onSelect: () => void;
  isSelected: boolean;
  isTarget: boolean;
  disabled: boolean;
}

export function Square(props: SquareProps): JSX.Element {
  function getClassName(): string {
    let className = `relative cursor-pointer w-24 h-24 ${getColour(props.position)}`;

    if (props.isSelected)
      className += ' bg-green-600';

    if (props.disabled)
      className += ' cursor-default';

    return className;
  }

  function onSelect(): void {
    if (props.disabled)
      return;

    props.onSelect();
  }

  const PieceComponent = PieceComponentMap[props.piece?.type];
  
  return (
    <div className={getClassName()} onClick={onSelect}>
      {props.position.x === 1 && (
        <div className='absolute top-1 left-1'>
          {props.position.y}
        </div>
      )}
      {props.position.y === 1 && (
        <div className='absolute bottom-1 right-1'>
          {convertNumberToChar(props.position.x)}
        </div>
      )}

      {!!props.isTarget && !props.piece && (
        <div className='w-full h-full flex items-center justify-center'>
          <div className={`w-1/3 h-1/3 rounded-full bg-gray-800`}></div>
        </div>
      )}

      {!!props.piece && (
        <div className={`relative w-full h-full flex items-center justify-center ${props.piece.colour === 'dark' ? 'text-black' : 'text-white'}`}>
          <PieceComponent colour={props.piece.colour} />
          {props.isTarget && (
            <div className='absolute rounded-full border-2 w-2/3 h-2/3 border-gray-800'></div>
          )}
        </div>
      )}
    </div>
  );
}