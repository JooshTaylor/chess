import React from 'react';
import { Square } from '../square/Square';
import './board.css';
import { getPositionId, getPieceAtPosition } from '../../utils/BoardHelper';
import { INITIAL_GAME_STATE } from '../../constants/InitialGameState';
import { GameReducer } from '../../reducers/GameReducer';
import { BOARD } from '../../constants/Board';
import { Position } from '../../interfaces/Position';
import { canPromotePiece } from '../../utils/canPromotePiece';
import { PieceId } from '../../interfaces/Piece';
import { PromotionModal } from '../promotion-modal/PromotionModal';
import { PieceType } from '../../interfaces/PieceType';
import { Menu } from '../menu/Menu';
import { getMoveAction } from '../../utils/getMoveAction';

export function ChessBoard(): JSX.Element {
  const [ state, dispatch ] = React.useReducer(GameReducer, INITIAL_GAME_STATE);
  const [ promotionPiece, setPromotionPiece ] = React.useState<PieceId>(null);

  function onMovePiece(targetPosition: Position): void {
    if (state.selectedPiece === '')
      return;

    const selectedPiece = state.pieces[state.selectedPiece];

    dispatch(getMoveAction(state, targetPosition, { validatePositions: true }));

    if (canPromotePiece(selectedPiece, targetPosition))
      setPromotionPiece(selectedPiece.id);
  }

  function onSelectSquare(position: Position): void {
    if (state.selectedPiece) {
      onMovePiece(position);
      return;
    }

    const piece = getPieceAtPosition(state, position);

    if (!piece)
      return;

    if (piece.colour !== state.turnColour)
      return;

    dispatch({
      type: 'select-piece',
      payload: {
        currentPosition: position,
        targetPosition: null
      }
    })
  }

  function onPromote(currentPieceId: PieceId, promotionType: PieceType): void {
    dispatch({
      type: 'promote-piece',
      payload: {
        pieceId: currentPieceId,
        type: promotionType
      }
    });

    setPromotionPiece(null);
  }

  return (
    <>
      <div className='board'>
        <div>
          {BOARD.map((row, rowIndex) => (
            <div key={rowIndex} className='board-row'>
              {row.map(position => {
                return (
                  <Square
                    key={getPositionId(position)}
                    onSelect={() => onSelectSquare(position)}
                    isSelected={state.selectedPiece !== '' && getPositionId(position) === getPositionId(state.pieces[state.selectedPiece])}
                    position={position}
                    piece={getPieceAtPosition(state, position)}
                    disabled={!!promotionPiece || state.status !== 'running'}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Menu
        state={state}
      />

      {!!promotionPiece && (
        <PromotionModal
          onPromote={promotionType => onPromote(promotionPiece, promotionType)}
        />
      )}
    </>
  );
}