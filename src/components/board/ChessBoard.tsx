import React from 'react';
import { Square } from '../square/Square';
import './board.css';
import { getPositionId, getPieceAtPosition } from '../../utils/BoardHelper';
import { ValidPositionLookups } from '../../utils/MovementHelper';
import { INITIAL_GAME_STATE } from '../../constants/InitialGameState';
import { GameReducer } from '../../reducers/GameReducer';
import { BOARD } from '../../constants/Board';
import { Position } from '../../interfaces/Position';
import { canPromotePiece } from '../../utils/canPromotePiece';
import { PieceId } from '../../interfaces/Piece';
import { PromotionModal } from '../promotion-modal/PromotionModal';
import { PieceType } from '../../interfaces/PieceType';
import { isCastling } from '../../utils/isCastling';

export function ChessBoard(): JSX.Element {
  const [ state, dispatch ] = React.useReducer(GameReducer, INITIAL_GAME_STATE);
  const [ promotionPiece, setPromotionPiece ] = React.useState<PieceId>(null);

  function onMovePiece(position: Position): void {
    if (state.selectedPiece === '')
      return;

    const selectedPiece = state.pieces[state.selectedPiece];
    const getValidPositions = ValidPositionLookups[selectedPiece.promotionType || selectedPiece.type];
    const validPositions = getValidPositions(selectedPiece, state);

    if (!validPositions.has(getPositionId(position))) {
      dispatch({
        type: 'deselect-piece',
        payload: {
          currentPosition: null,
          targetPosition: null
        }
      });
      return;
    }

    const currentPosition: Position = { x: selectedPiece.x, y: selectedPiece.y };

    if (isCastling(selectedPiece, position)) {
      dispatch({
        type: 'castle',
        payload: {
          currentPosition,
          targetPosition: position
        }
      });
      return;
    }

    const pieceAtPosition = getPieceAtPosition(state, position);

    if (pieceAtPosition) {
      dispatch({
        type: 'take-piece',
        payload: {
          currentPosition,
          targetPosition: position
        }
      });
    } else {
      dispatch({
        type: 'move-piece',
        payload: {
          currentPosition,
          targetPosition: position
        }
      });
    }

    if (canPromotePiece(selectedPiece, position))
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
                    disabled={!!promotionPiece}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {!!promotionPiece && (
        <PromotionModal
          onPromote={promotionType => onPromote(promotionPiece, promotionType)}
        />
      )}
    </>
  );
}