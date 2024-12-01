import { Piece } from "../interfaces/Piece";
import { PieceColour } from "../interfaces/PieceColour";
import { GameState } from "../reducers/GameReducer";

export function getKing(state: GameState, colour: PieceColour): Piece {
  return Object.values(state.pieces).find(p => {
    return p.colour === colour && p.type === 'king';
  });
}