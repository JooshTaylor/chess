import React from 'react';
import { Grid } from '../../interfaces/Grid';
import { Square } from '../square/Square';
import './board.css';

interface BoardProps {
  board: Grid;
}

export function Board(props: BoardProps): JSX.Element {
  return (
    <div className='board'>
      <div>
        {props.board.map((row, rowIndex) => (
          <div key={rowIndex} className='board-row'>
            {row.map((cell, i) => (
              <Square
                key={`${cell.x}:${cell.y}`}
                cell={cell}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}