import { INITIAL_GAME_STATE } from "../constants/InitialGameState";
import { Game } from "../interfaces/Game";
import { Piece } from "../interfaces/Piece";
import { PieceType } from "../interfaces/PieceType";
import { Position } from "../interfaces/Position";
import { GameReducer, GameState } from "../reducers/GameReducer";
import { ReversePieceSectionMap } from "./encodeNotation";
import { getKing } from "./getKing";
import { getMoveAction } from "./getMoveAction";
import { getPiecePositionMap, PiecePositionMap } from "./getPiecePositionMap";
import { getPieceValidPositionsMap } from "./getPieceValidPositionsMap";

const DISAMBIGUATION_CHARS = new Set<string>([
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  '1', '2', '3', '4', '5', '6', '7', '8'
]);

const COORDINATE_MAP: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8
};

function getDisambiguationSection(charOne: string, charTwo: string): string {
  let section = '';

  if (DISAMBIGUATION_CHARS.has(charOne))
    section += charOne;
  if (DISAMBIGUATION_CHARS.has(charTwo))
    section += charTwo;

  return section;
}

function getPromotionType(secondLastChar: string, lastChar: string): PieceType {
  if (secondLastChar !== '=')
    return null;

  return ReversePieceSectionMap[lastChar];
}

function getSelectedPiece(
  state: GameState,
  pieceType: PieceType,
  disambiguationSection: string,
  targetPosition: Position,
  piecePositionMap: PiecePositionMap
): Piece {
  const pieceValidPositionsMap = getPieceValidPositionsMap(state, piecePositionMap, true);

  const typePieces = Object.values(state.pieces).filter(piece => piece.status === 'alive' && piece.type === pieceType && piece.colour === state.turnColour);

  const possiblePieces: Piece[] = [];

  for (const piece of typePieces) {
    const validMoves = pieceValidPositionsMap[piece.id];

    for (const move of validMoves) {
      const [ x, y ] = move.split(':');
      const validPosition: Position = { x: Number(x), y: Number(y) };

      if (validPosition.x === targetPosition.x && validPosition.y === targetPosition.y)
        possiblePieces.push(piece);
    }
  }

  if (possiblePieces.length === 1)
    return possiblePieces[0];

  if (disambiguationSection.length === 1) {
    const isFile = Number.isNaN(Number(disambiguationSection));

    if (isFile) {
      const xCoord = COORDINATE_MAP[disambiguationSection];

      return possiblePieces.find(piece => {
        return piecePositionMap[piece.id].x === xCoord;
      });
    }

    return possiblePieces.find(piece => {
      return piecePositionMap[piece.id].y === Number(disambiguationSection);
    });
  }

  const currentPosition: Position = {
    x: COORDINATE_MAP[disambiguationSection[0]],
    y: Number(disambiguationSection[1])
  };

  return possiblePieces.find(piece => {
    const piecePosition = piecePositionMap[piece.id];
    piecePosition.x === currentPosition.x && piecePosition.y === currentPosition.y;
  });
}

export function getInitialState(game: Game, moves: string[] = []): GameState {
  let currentState = INITIAL_GAME_STATE;

  if (game)
    currentState.status = game.status;

  for (let move of moves) {
    const piecePositionMap = getPiecePositionMap(currentState.positions);

    if (move === '0-0' || move === '0-0-0') {
      const king = getKing(currentState, currentState.turnColour);
      const kingPosition = piecePositionMap[king.id];

      const targetPosition: Position = move === '0-0'
        ? { x: kingPosition.x + 2, y: kingPosition.y }
        : { x: kingPosition.x - 2, y: kingPosition.y };

      const action = getMoveAction(currentState, king.id, kingPosition, targetPosition);

      currentState = {
        ...GameReducer(currentState, action),
        moves: currentState.moves.concat(move)
      };

      continue;
    }

    move = move.replace('+', '');
    move = move.replace('#', '');
    move = move.replace(' 1/2-1/2', '');

    const chars = move.split('');

    const pieceType = ReversePieceSectionMap[chars[0]] || 'pawn';

    if (pieceType !== 'pawn')
      chars.shift();

    const hasCapture = chars.includes('x');

    const promotionType = getPromotionType(chars[chars.length - 2], chars[chars.length - 1]);

    if (promotionType) {
      chars.pop();
      chars.pop();
    }

    let disambiguationSection = '';

    if ((hasCapture && chars.length > 3) || (!hasCapture && chars.length > 2)) {
      disambiguationSection = getDisambiguationSection(chars[0], chars[1]);
    }

    if (disambiguationSection.length === 1) {
      chars.shift();
    }

    if (disambiguationSection.length === 2) {
      chars.shift();
      chars.shift();
    }

    if (hasCapture)
      chars.shift();

    const targetPosition: Position = {
      x: COORDINATE_MAP[chars[0]],
      y: Number(chars[1])
    };

    const piece = getSelectedPiece(
      currentState,
      pieceType,
      disambiguationSection,
      targetPosition,
      piecePositionMap
    );

    const action = getMoveAction(currentState, piece.id, piecePositionMap[piece.id], targetPosition);

    currentState = {
      ...GameReducer(currentState, action),
      moves: currentState.moves.concat(move)
    };
  }

  return currentState;
}