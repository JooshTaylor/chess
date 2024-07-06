import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getValidPositionSet } from "../getValidPositions";

export function getValidKnightPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap): Set<string> {
  const { validPositions, tryAddPosition } = getValidPositionSet();

  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  // Top left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY + 2 });

  // Top right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY + 2 });

  // Right top
  tryAddPosition(state, piece, { x: currentX + 2, y: currentY + 1 });

  // Right bottom
  tryAddPosition(state, piece, { x: currentX + 2, y: currentY - 1 });

  // Bottom right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY - 2 });

  // Bottom left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY - 2 });

  // Left bottom
  tryAddPosition(state, piece, { x: currentX - 2, y: currentY - 1 });

  // Left top
  tryAddPosition(state, piece, { x: currentX - 2, y: currentY + 1 });

  return validPositions;
}