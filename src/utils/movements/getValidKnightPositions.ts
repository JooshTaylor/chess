import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getValidPositionSet } from "../getValidPositions";
import { PieceValidPositionsMap } from "../getPieceValidPositionsMap";

export function getValidKnightPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap, pieceValidPositionMap: PieceValidPositionsMap): Set<string> {
  const { validPositions, tryAddPosition } = getValidPositionSet();

  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  // Top left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY + 2 }, piecePositionMap, pieceValidPositionMap);

  // Top right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY + 2 }, piecePositionMap, pieceValidPositionMap);

  // Right top
  tryAddPosition(state, piece, { x: currentX + 2, y: currentY + 1 }, piecePositionMap, pieceValidPositionMap);

  // Right bottom
  tryAddPosition(state, piece, { x: currentX + 2, y: currentY - 1 }, piecePositionMap, pieceValidPositionMap);

  // Bottom right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY - 2 }, piecePositionMap, pieceValidPositionMap);

  // Bottom left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY - 2 }, piecePositionMap, pieceValidPositionMap);

  // Left bottom
  tryAddPosition(state, piece, { x: currentX - 2, y: currentY - 1 }, piecePositionMap, pieceValidPositionMap);

  // Left top
  tryAddPosition(state, piece, { x: currentX - 2, y: currentY + 1 }, piecePositionMap, pieceValidPositionMap);

  return validPositions;
}