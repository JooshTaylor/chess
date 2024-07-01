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
import { getPiecePositionMap } from '../../utils/getPiecePositionMap';
import { getPieceValidPositionsMap } from '../../utils/getPieceValidPositionsMap';
import { isCastling } from '../../utils/isCastling';

export function ChessBoard(): JSX.Element {
  const [ state, dispatch ] = React.useReducer(GameReducer, INITIAL_GAME_STATE);
  const [ promotionPiece, setPromotionPiece ] = React.useState<PieceId>(null);

  const piecePositionMap = React.useMemo(() => getPiecePositionMap(state.positions), [state.positions]);
  const pieceValidPositionsMap = React.useMemo(() => getPieceValidPositionsMap(state, piecePositionMap), [state, piecePositionMap]);

  function onMovePiece(targetPosition: Position): void {
    if (state.selectedPiece === '')
      return;

    const selectedPiece = state.pieces[state.selectedPiece];
  
    const validPositions = pieceValidPositionsMap[state.selectedPiece];
    if (!validPositions.has(getPositionId(targetPosition))) {
      dispatch({
        type: 'deselect-piece',
        payload: {
          currentPosition: null,
          targetPosition: null
        }
      });
    }
  
    const currentPosition = piecePositionMap[selectedPiece.id];
  
    if (isCastling(selectedPiece, currentPosition, targetPosition)) {
      dispatch({
        type: 'castle',
        payload: {
          currentPosition,
          targetPosition
        }
      });
    }
  
    const pieceAtPosition = getPieceAtPosition(state, targetPosition);
  
    if (pieceAtPosition) {
      dispatch({
        type: 'take-piece',
        payload: {
          currentPosition,
          targetPosition
        }
      });
    } else {
      dispatch({
        type: 'move-piece',
        payload: {
          currentPosition,
          targetPosition
        }
      });
    }

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
                    isSelected={state.selectedPiece !== '' && getPositionId(position) === getPositionId(piecePositionMap[state.selectedPiece])}
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
        piecePositionMap={piecePositionMap}
      />

      {!!promotionPiece && (
        <PromotionModal
          onPromote={promotionType => onPromote(promotionPiece, promotionType)}
        />
      )}
    </>
  );
}