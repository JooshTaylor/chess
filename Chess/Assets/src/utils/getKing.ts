import { Piece } from "../interfaces/Piece";
import { PieceColour } from "../interfaces/PieceColour";
import { GameState } from "../reducers/GameReducer";

export function getKing(state: GameState, colour: PieceColour): Piece {
  return state.pieces[colour === 'dark' ? 'dark-king' : 'light-king'];
}