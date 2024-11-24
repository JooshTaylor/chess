import { GameState } from "../../reducers/GameReducer";
import { PieceColour } from "../../interfaces/PieceColour";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { Game } from "../../interfaces/Game";
import { GameStatus } from "../../enums/GameStatus";

function getColourString(colour: PieceColour): string {
  if (colour === 'black')
    return 'Black';

  return 'White';
}

type Moves = Array<[ number, string, string ]>;

interface MenuProps {
  state: GameState;
  game: Game;
  playerColour: PieceColour;
  piecePositionMap: PiecePositionMap;
}

export function Menu(props: MenuProps): JSX.Element {
  const moves: Moves = [];

  for (let i = 0; i < props.state.moves.length; i++) {
    if (i % 2 === 0) {
      moves.push([ (i + 2) / 2, props.state.moves[i], '' ]);
      continue;
    }

    moves[moves.length - 1][2] = props.state.moves[i];
  }

  return (
    <div className='w-[300px] max-h-[768px] min-h-[768px] rounded-lg border border-chess-black text-chess-black bg-chess-white ms-4 font-semibold overflow-y-scroll'>
      <div className='p-2'>
        {props.game.status === GameStatus.Running && (
          <>
            {props.playerColour === 'white' && <h2>You are playing as White</h2>}
            {props.playerColour === 'black' && <h2>You are playing as Black</h2>}
            {!props.playerColour && <h2>You are a spectator</h2>}
            <hr className='my-2 border-chess-black' />
          </>
        )}

        <h2>Moves</h2>

        <ul>
          {moves.map(([ moveNumber, whiteMove, blackMove ]) => {
            return (
              <li key={moveNumber} className='columns-3'>
                <div>{moveNumber}.</div>
                <div>{whiteMove}</div>
                <div>{blackMove}</div>
              </li>
            );
          })}
        </ul>

        {props.state.status === 'complete' && (
          <div>
            Game over! {getColourString(props.state.turnColour === 'black' ? 'white' : 'black')} is the winner!
          </div>
        )}
      </div>
    </div>
  );
}