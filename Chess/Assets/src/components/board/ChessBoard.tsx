import React from 'react';
import ReactDOM from 'react-dom/client'

import { Square } from '../square/Square';
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
import { isInCheckMate } from '../../utils/isInCheckMate';
import { getMoveAction } from '../../utils/getMoveAction';
import { isInCheck } from '../../utils/isInCheck';
import { encodeNotation } from '../../utils/encodeNotation';
import { isInStalemate } from '../../utils/isInStalemate';
import { EndGameModal } from '../end-game-modal/EndGameModal';
import { getInitialState } from '../../utils/getInitialState';
import { Game } from '../../interfaces/Game';
import { PendingGameModal } from '../pending-game-modal/PendingGameModal';
import { GameStatus } from '../../enums/GameStatus';
import { getPlayerId } from '../../utils/getPlayerId';
import { PieceColour } from '../../interfaces/PieceColour';

const modalRoot = ReactDOM.createRoot(document.getElementById('modal'));

interface ChessBoardProps {
  game: Game;
}

export function ChessBoard(props: ChessBoardProps): JSX.Element {
  const initialState = React.useMemo(() => getInitialState(props.game), [props.game.status]);
  const [ state, _dispatch ] = React.useState(initialState);

  React.useEffect(() => {
    _dispatch(initialState);
  }, [initialState]);

  const playerColour: PieceColour = React.useMemo(() => {
    const playerId = getPlayerId(props.game.id);

    if (props.game.playerOneId === playerId)
      return 'white';

    if (props.game.playerTwoId === playerId)
      return 'black';
  }, [props.game]);

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
    const isCheckMate = isInCheckMate(futureState, futureState.turnColour, pieceValidPositionsMap.current, isCheck);
    const isStalemate = isInStalemate(futureState, futureState.turnColour, pieceValidPositionsMap.current, isCheck);

    const notation = encodeNotation(state, previousPositionMap, previousValidPositions, action, isCheck, isCheckMate, isStalemate);

    _dispatch({
      ...futureState,
      moves: futureState.moves.concat(notation)
    });
  };

  React.useEffect(() => {
    const latestMove = state.moves[state.moves.length - 1];

    if (!latestMove)
      return;

    const isCheckMate = latestMove.endsWith('#');
    const isStalemate = latestMove.endsWith('1/2-1/2');

    if (isCheckMate || isStalemate) {
      dispatch({
        type: 'end-game',
        payload: {
          winner: isCheckMate ? (state.turnColour === 'black' ? 'white' : 'black') : null,
          result: isCheckMate ? 'check-mate' : 'stalemate'
        }
      });
    }
  }, [state.moves]);

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

        modalRoot.render(<></>);
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

  function canMove(): boolean {
    if (props.game.status !== GameStatus.Running)
      return false;

    return state.turnColour === playerColour;
  }

  const board = playerColour === 'black' ? [...BOARD].reverse() : BOARD;

  return (
    <>
      <div className='flex flex-nowrap h-screen items-center justify-center'>
        <div>
          {board.map((row, rowIndex) => (
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
                    disabled={!canMove()}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <Menu
          state={state}
          piecePositionMap={piecePositionMap.current}
          game={props.game}
          playerColour={playerColour}
        />
      </div>

      {state.status === 'complete' && (
        <EndGameModal result={state.result} winner={state.winner} />
      )}

      {state.status === 'pending' && (
        <PendingGameModal />
      )}
    </>
  );
}