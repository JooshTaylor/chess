import React from 'react';
import { Square } from '../square/Square';
import './board.css';
import { getCellPosition, getPieceAtPosition } from '../../utils/BoardHelper';
import { ValidPositionLookups } from '../../utils/MovementHelper';
import { INITIAL_GAME_STATE } from '../../constants/InitialGameState';
import { GameReducer } from '../../reducers/GameReducer';
import { ICell } from '../../interfaces/Cell';
import { BOARD } from '../../constants/Board';

export function ChessBoard(): JSX.Element {
  const [ state, dispatch ] = React.useReducer(GameReducer, INITIAL_GAME_STATE);

  const [ selectedCell, setSelectedCell ] = React.useState<ICell>(null);

  const selectedCellId = getCellPosition(selectedCell);

  function onSelectSquare(cell: ICell): void {
    if (selectedCell) {
      const selectedPiece = getPieceAtPosition(state, selectedCell);
      const getValidPositions = ValidPositionLookups[selectedPiece.type];
      const validPositions = getValidPositions(selectedPiece, state);

      console.log('valid positions', validPositions);

      if (!validPositions.has(getCellPosition(cell))) {
        setSelectedCell(null);
        return;
      }

      console.log('is valid pos');

      return;
    }

    const piece = getPieceAtPosition(state, cell);

    if (!piece)
      return;

    if (piece.colour !== state.turnColour)
      return;

    setSelectedCell(cell);
  }

  return (
    <div className='board'>
      <div>
        {BOARD.map((row, rowIndex) => (
          <div key={rowIndex} className='board-row'>
            {row.map(cell => {
              return (
                <Square
                  key={getCellPosition(cell)}
                  onSelect={() => onSelectSquare(cell)}
                  isSelected={getCellPosition(cell) === selectedCellId}
                  cell={cell}
                  piece={getPieceAtPosition(state, cell)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}