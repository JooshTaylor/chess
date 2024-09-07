import React from 'react';
import ReactDOM from 'react-dom/client'
import { Square } from '../square/Square';
import { INITIAL_GAME_STATE } from '../../constants/InitialGameState';
import { GameAction, GameReducer, isMoveAction } from '../../reducers/GameReducer';
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
import { isInCheckMate } from '../../utils/isInCheckMate';
import { getMoveAction } from '../../utils/getMoveAction';
import { isInCheck } from '../../utils/isInCheck';
import { encodeNotation } from '../../utils/encodeNotation';

const modalRoot = ReactDOM.createRoot(document.getElementById('modal'));

export function ChessBoard(): JSX.Element {
  const [ state, _dispatch ] = React.useState(INITIAL_GAME_STATE);

  const initialPiecePositionMap = React.useMemo(() => getPiecePositionMap(state.positions), []);
  const initialPieceValidPositionsMap = React.useMemo(() => getPieceValidPositionsMap(state, initialPiecePositionMap, true), []);

  const piecePositionMap = React.useRef<PiecePositionMap>(initialPiecePositionMap);
  const pieceValidPositionsMap = React.useRef<PieceValidPositionsMap>(initialPieceValidPositionsMap);

  const dispatch = (action: GameAction) => {
    const futureState = GameReducer(state, action);

    if (!isMoveAction(action.type)) {
      _dispatch(futureState);
      return;
    }

    const previousPositionMap = piecePositionMap.current;
    const previousValidPositions = pieceValidPositionsMap.current;

    piecePositionMap.current = getPiecePositionMap(futureState.positions);
    pieceValidPositionsMap.current = getPieceValidPositionsMap(futureState, piecePositionMap.current, true);

    const isCheck = isInCheck(futureState, futureState.turnColour, piecePositionMap.current, pieceValidPositionsMap.current);
    const isCheckMate = isInCheckMate(futureState, futureState.turnColour, piecePositionMap.current, pieceValidPositionsMap.current);

    const notation = encodeNotation(state, previousPositionMap, previousValidPositions, action, isCheck, isCheckMate);

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

  async function onMovePiece(targetPosition: Position): Promise<void> {
    if (state.selectedPiece === '')
      return;

    const selectedPiece = state.pieces[state.selectedPiece];
    const currentPosition = piecePositionMap.current[selectedPiece.id];
  
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
      const onPromote = (promotionType: PieceType) => {
        dispatch({
          type: 'promote-piece',
          payload: {
            targetPosition,
            currentPosition,
            promotionType
          }
        });

        modalRoot.unmount();
      };

      modalRoot.render(
        <PromotionModal onPromote={onPromote} />
      );

      return;
    }

    dispatch(getMoveAction(state, state.selectedPiece, currentPosition, targetPosition));
  }

  function onSelectSquare(position: Position): void {
    if (state.selectedPiece) {
      onMovePiece(position);
      return;
    }

    onSelectPiece(position);
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
                    disabled={state.status !== 'running'}
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

      {state.status === 'ended' && (
        <Modal title={`Game over`}>
          <p>Game over! {state.winner} is the winner!</p>
        </Modal>
      )}
    </>
  );
}