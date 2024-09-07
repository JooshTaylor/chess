import React from 'react';
import { Square } from '../square/Square';
import { INITIAL_GAME_STATE } from '../../constants/InitialGameState';
import { GameAction, GameReducer, GameState, isMoveAction } from '../../reducers/GameReducer';
import { BOARD } from '../../constants/Board';
import { Position } from '../../interfaces/Position';
import { canPromotePiece } from '../../utils/canPromotePiece';
import { PromotionModal } from '../promotion-modal/PromotionModal';
import { PieceType } from '../../interfaces/PieceType';
import { Menu } from '../menu/Menu';
import { getPiecePositionMap, PiecePositionMap } from '../../utils/getPiecePositionMap';
import { getPieceValidPositionsMap, PieceValidPositionsMap } from '../../utils/getPieceValidPositionsMap';
import { getPieceAtPosition } from '../../utils/getPieceAtPosition';
import { getPositionId } from '../../utils/getPositionId';
import { Modal } from '../modal/Modal';
import { PieceId } from '../../interfaces/PieceId';
import { isInCheckMate } from '../../utils/isInCheckMate';
import { getMoveAction } from '../../utils/getMoveAction';
import { isInCheck } from '../../utils/isInCheck';
import { encodeNotation } from '../../utils/encodeNotation';

export function ChessBoard(): JSX.Element {
  const [ state, _dispatch ] = React.useState(INITIAL_GAME_STATE);
  const [ promotionPiece, setPromotionPiece ] = React.useState<PieceId>(null);

  const initialPiecePositionMap = React.useMemo(() => getPiecePositionMap(state.positions), []);
  const initialPieceValidPositionsMap = React.useMemo(() => getPieceValidPositionsMap(state, initialPiecePositionMap, true), []);

  const piecePositionMap = React.useRef<PiecePositionMap>(initialPiecePositionMap);
  const pieceValidPositionsMap = React.useRef<PieceValidPositionsMap>(initialPieceValidPositionsMap);

  const dispatch = (action: GameAction) => {
    const futureState = GameReducer(state, action);
    _dispatch(futureState);

    if (!isMoveAction(action.type)) {
      _dispatch(futureState);
      return;
    }

    piecePositionMap.current = getPiecePositionMap(futureState.positions);
    pieceValidPositionsMap.current = getPieceValidPositionsMap(futureState, piecePositionMap.current, true);

    const isCheck = isInCheck(futureState, futureState.turnColour, piecePositionMap.current, pieceValidPositionsMap.current);
    const isCheckMate = isInCheckMate(futureState, futureState.turnColour, piecePositionMap.current, pieceValidPositionsMap.current);

    const notation = encodeNotation(state, action, isCheck, isCheckMate);

    _dispatch({
      ...futureState,
      moves: futureState.moves.concat(notation)
    });
  };

  React.useEffect(() => {
    if (isInCheckMate(state, state.turnColour, piecePositionMap.current, pieceValidPositionsMap.current)) {
      dispatch({
        type: 'check-mate',
        payload: {
          winner: state.turnColour === 'dark' ? 'light' : 'dark'
        }
      });
    }
  }, [state.positions]);

  const validPositions = state.selectedPiece !== '' ? pieceValidPositionsMap.current[state.selectedPiece] : null;

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
  
    if (!validPositions.has(getPositionId(targetPosition))) {
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

    dispatch(getMoveAction(state, state.selectedPiece, targetPosition, piecePositionMap.current));
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
        piecePositionMap: piecePositionMap.current
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
                    isSelected={state.selectedPiece !== '' && getPositionId(position) === getPositionId(piecePositionMap.current[state.selectedPiece])}
                    position={position}
                    piece={getPieceAtPosition(state, position)}
                    isTarget={validPositions?.has(getPositionId(position))}
                    disabled={!!promotionPiece || state.status !== 'running'}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <Menu
          state={state}
          piecePositionMap={piecePositionMap.current}
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