import React from 'react';
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
}

export function Square(props: SquareProps): JSX.Element {
  return (
    <div className={`square ${getColour(props.cell)}`}>
      <div className='label'>
        {props.cell.x}{props.cell.y}
      </div>

      {!!props.cell.piece && (
        <div className='piece'>
          {props.cell.piece?.name}
        </div>
      )}
    </div>
  );
}