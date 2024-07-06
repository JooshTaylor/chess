import React from 'react';
import { Square } from '../square/Square';
import './board.css';
import { INITIAL_GAME_STATE } from '../../constants/InitialGameState';
import { GameAction, GameReducer } from '../../reducers/GameReducer';
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
import { getPieceAtPosition } from '../../utils/getPieceAtPosition';
import { getPositionId } from '../../utils/getPositionId';
import { isInCheckMate } from '../../utils/isKingVulnerable';
import { Modal } from '../modal/Modal';
import { isEnPassant } from '../../utils/isEnPassant';

export function ChessBoard(): JSX.Element {
  const [ state, dispatch ] = React.useReducer(GameReducer, INITIAL_GAME_STATE);
  const [ promotionPiece, setPromotionPiece ] = React.useState<PieceId>(null);

  const piecePositionMap = React.useMemo(() => getPiecePositionMap(state.positions), [state.positions]);
  const pieceValidPositionsMap = React.useMemo(() => getPieceValidPositionsMap(state, piecePositionMap), [state, piecePositionMap]);
  
  React.useEffect(() => {
    if (state.status !== 'running')
      return;

    if (isInCheckMate(state, state.turnColour, piecePositionMap, pieceValidPositionsMap)) {
      dispatch({
        type: 'check-mate',
        payload: {
          winner: state.turnColour === 'black' ? 'white' : 'black'
        }
      });
    }
  }, [ state, pieceValidPositionsMap ]);

  function getMoveAction(targetPosition: Position): GameAction {
    if (state.selectedPiece === '')
      return null;

    const currentPosition = piecePositionMap[state.selectedPiece];
    const selectedPiece = state.pieces[state.selectedPiece];
    
    if (isCastling(selectedPiece, currentPosition, targetPosition)) {
      return {
        type: 'castle',
        payload: {
          currentPosition,
          targetPosition
        }
      };
    }

    if (isEnPassant(state, selectedPiece, currentPosition, targetPosition)) {
      return {
        type: 'en-passant',
        payload: {
          currentPosition,
          targetPosition
        }
      }
    }
  
    const pieceAtPosition = getPieceAtPosition(state, targetPosition);
  
    if (pieceAtPosition) {
      return {
        type: 'take-piece',
        payload: {
          currentPosition,
          targetPosition
        }
      };
    } else {
      return {
        type: 'move-piece',
        payload: {
          currentPosition,
          targetPosition
        }
      };
    }
  }

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
  
    const validPositions = pieceValidPositionsMap[state.selectedPiece];
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

    const moveAction = getMoveAction(targetPosition);

    const futureState = GameReducer(state, moveAction);
    const futurePositionsMap = getPiecePositionMap(futureState.positions);
    const futureValidPositionsMap = getPieceValidPositionsMap(futureState, futurePositionsMap);

    // Prevent moves that will put the mover into check mate
    if (isInCheckMate(futureState, state.turnColour, futurePositionsMap, futureValidPositionsMap)) {
      dispatch({
        type: 'deselect-piece',
        payload: {
          currentPosition: null,
          targetPosition: null
        }
      });
      return;
    }

    dispatch(moveAction);

    if (canPromotePiece(selectedPiece, targetPosition))
      setPromotionPiece(selectedPiece.id);
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

      {state.status === 'ended' && (
        <Modal title={`Game over`}>
          <p>Game over! {state.winner} is the winner!</p>
        </Modal>
      )}
    </>
  );
}