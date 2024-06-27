import React from 'react';
import { Grid } from '../../interfaces/Grid';
import { Square } from '../square/Square';
import './board.css';
import { Cell } from '../../interfaces/Cell';
import { getCellPosition } from '../../utils/BoardHelper';

interface BoardProps {
  board: Grid;
}

export function Board(props: BoardProps): JSX.Element {
  const [ selectedSquare, setSelectedSquare ] = React.useState<Cell>(null);

  const selectedSquareId = getCellPosition(selectedSquare);

  function onSelectSquare(cell: Cell): void {
    if (selectedSquare) {
      const validPositions = selectedSquare.piece.getValidPositions?.(getCellPosition(selectedSquare), props.board);

      if (!validPositions.has(getCellPosition(cell))) {
        setSelectedSquare(null);
        return;
      }

      console.log('is valid pos');

      return;
    }

    if (!cell.piece)
      return;

    setSelectedSquare(cell);
  }

  return (
    <div className='board'>
      <div>
        {props.board.map((row, rowIndex) => (
          <div key={rowIndex} className='board-row'>
            {row.map((cell, i) => {
              const id = getCellPosition(cell);

              return (
                <Square
                  key={id}
                  onSelect={() => onSelectSquare(cell)}
                  isSelected={id === selectedSquareId}
                  cell={cell}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}