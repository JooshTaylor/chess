import { AxisPositions } from "../interfaces/AxisPositions";
import { Piece, PieceId } from "../interfaces/Piece";
import { PieceColour } from "../interfaces/PieceColour";

export type GameActionType = '';

export interface GameState {
  turnColour: PieceColour;
  pieces: Record<PieceId, Piece>;
  positions: Record<AxisPositions, Record<AxisPositions, PieceId | ''>>;
}

interface GameAction {
  type: GameActionType;
}

export function GameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {

    default:
      return state;
  }
}