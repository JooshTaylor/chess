import React from 'react';
import { Square } from '../square/Square';
import { INITIAL_GAME_STATE } from '../../constants/InitialGameState';
import { GameReducer } from '../../reducers/GameReducer';
import { BOARD } from '../../constants/Board';
import { Position } from '../../interfaces/Position';
import { canPromotePiece } from '../../utils/canPromotePiece';
import { PromotionModal } from '../promotion-modal/PromotionModal';
import { PieceType } from '../../interfaces/PieceType';
import { Menu } from '../menu/Menu';
import { getPiecePositionMap } from '../../utils/getPiecePositionMap';
import { getPieceValidPositionsMap } from '../../utils/getPieceValidPositionsMap';
import { getPieceAtPosition } from '../../utils/getPieceAtPosition';
import { getPositionId } from '../../utils/getPositionId';
import { Modal } from '../modal/Modal';
import { PieceId } from '../../interfaces/PieceId';
import { getMoveAction } from '../../utils/getMoveAction';

export function ChessBoard(): JSX.Element {
  const [ state, dispatch ] = React.useReducer(GameReducer, INITIAL_GAME_STATE);
  const [ promotionPiece, setPromotionPiece ] = React.useState<PieceId>(null);

  const piecePositionMap = React.useMemo(() => getPiecePositionMap(state.positions), [state.positions]);
  const pieceValidPositionsMap = React.useMemo(() => getPieceValidPositionsMap(state, piecePositionMap, true), [state, piecePositionMap]);

  const validPositions = state.selectedPiece !== '' ? pieceValidPositionsMap[state.selectedPiece] : null;

  console.log(pieceValidPositionsMap);

  // React.useEffect(() => {
  //   if (state.status !== 'running')
  //     return;

  //   if (isInCheckMate(state, state.turnColour, piecePositionMap, pieceValidPositionsMap)) {
  //     dispatch({
  //       type: 'check-mate',
  //       payload: {
  //         winner: state.turnColour === 'dark' ? 'light' : 'dark'
  //       }
  //     });
  //   }
  // }, [ state, pieceValidPositionsMap ]);

  function onSelectPiece(position: Position): void {
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
    });
  }

  function onMovePiece(targetPosition: Position): void {
    if (state.selectedPiece === '')
      return;

    const selectedPiece = state.pieces[state.selectedPiece];
  
    if (!validPositions[getPositionId(targetPosition)]) {
      dispatch({
        type: 'deselect-piece',
        payload: {
          currentPosition: null,
          targetPosition: null
        }
      });
      return;
    }

    if (canPromotePiece(selectedPiece, targetPosition)) {
      setPromotionPiece(selectedPiece.id);
      return;
    }

    const { isCheck, isCheckMate } = validPositions[getPositionId(targetPosition)];

    console.log('is check', isCheck);

    dispatch(getMoveAction(state, state.selectedPiece, targetPosition, piecePositionMap));
  }

  function onSelectSquare(position: Position): void {
    if (state.selectedPiece) {
      onMovePiece(position);
      return;
    }

    onSelectPiece(position);
  }

  function onPromote(currentPieceId: PieceId, promotionType: PieceType): void {
    dispatch({
      type: 'promote-piece',
      payload: {
        pieceId: currentPieceId,
        type: promotionType,
        piecePositionMap
      }
    });

    setPromotionPiece(null);
  }

  return (
    <>
      <div className='flex flex-nowrap h-screen items-center justify-center'>
        <div>
          {BOARD.map((row, rowIndex) => (
            <div key={rowIndex} className='flex'>
              {row.map(position => {
                return (
                  <Square
                    key={getPositionId(position)}
                    onSelect={() => onSelectSquare(position)}
                    isSelected={state.selectedPiece !== '' && getPositionId(position) === getPositionId(piecePositionMap[state.selectedPiece])}
                    position={position}
                    piece={getPieceAtPosition(state, position)}
                    isTarget={!!validPositions?.[getPositionId(position)]}
                    disabled={!!promotionPiece || state.status !== 'running'}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <Menu
          state={state}
          piecePositionMap={piecePositionMap}
        />
      </div>

      {!!promotionPiece && (
        <PromotionModal
          onPromote={promotionType => onPromote(promotionPiece, promotionType)}
        />
      )}

      {state.status === 'ended' && (
        <Modal title={`Game over`}>
          <p>Game over! {state.winner} is the winner!</p>
        </Modal>
      )}
    </>
  );
}