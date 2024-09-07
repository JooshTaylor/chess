import { INITIAL_GAME_STATE } from "../constants/InitialGameState";
import { PieceType } from "../interfaces/PieceType";
import { GameState } from "../reducers/GameReducer";
import { ReversePieceSectionMap } from "./encodeNotation";

const DISAMBIGUATION_CHARS = new Set<string>([
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  '1', '2', '3', '4', '5', '6', '7', '8'
]);

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

export function getInitialState(moves: string[]): GameState {
  const initialState = INITIAL_GAME_STATE;

  // TODO: Handle castling notation
  for (let move of moves) {
    const isCheck = move.endsWith('+');
    const isCheckMate = move.endsWith('#');
    const isStalemate = move.endsWith('1/2-1/2');

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

    const targetPosition = chars.join('');

    console.log('Piece', pieceType);
    console.log('Promotion Piece', promotionType);
    console.log('Target Position', targetPosition);
    console.log('is Capture', hasCapture);
    console.log('isCheck', isCheck);
    console.log('isCheckMate', isCheckMate);
    console.log('isStaleMate', isStalemate);
    console.log('Disambiguation', disambiguationSection);
  }

  return initialState;
}