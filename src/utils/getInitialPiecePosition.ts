import { INITIAL_GAME_STATE } from "../constants/InitialGameState";
import { PieceId } from "../interfaces/Piece";
import { Position } from "../interfaces/Position";
import { getPiecePositionMap } from "./getPiecePositionMap";

export function getInitialPiecePosition(pieceId: PieceId): Position {
  return getPiecePositionMap(INITIAL_GAME_STATE.positions)[pieceId];
}