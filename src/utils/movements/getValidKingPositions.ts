import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getValidPositionSet } from "../getValidPositions";
import { getPieceAtPosition } from "../getPieceAtPosition";
import { PieceValidPositionsMap } from "../getPieceValidPositionsMap";

export function getValidKingPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap, pieceValidPositionMap: PieceValidPositionsMap): Set<string> {
  const { validPositions, tryAddPosition } = getValidPositionSet();

  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  // Up
  tryAddPosition(state, piece, { x: currentX, y: currentY + 1 }, piecePositionMap, pieceValidPositionMap);

  // Top right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY + 1 }, piecePositionMap, pieceValidPositionMap);

  // Right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY }, piecePositionMap, pieceValidPositionMap);

  // Bottom right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY - 1 }, piecePositionMap, pieceValidPositionMap);

  // Down
  tryAddPosition(state, piece, { x: currentX, y: currentY - 1 }, piecePositionMap, pieceValidPositionMap);

  // Down left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY - 1 }, piecePositionMap, pieceValidPositionMap);

  // Left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY }, piecePositionMap, pieceValidPositionMap);

  // Top left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY + 1 }, piecePositionMap, pieceValidPositionMap);

  if (piece.totalMoves > 0)
    return validPositions; 

  // King side castle
  if (!getPieceAtPosition(state, { x: currentX + 1, y: currentY }) && !getPieceAtPosition(state, { x: currentX + 2, y: currentY })) {
    const pieceInRookPosition = getPieceAtPosition(state, { x: currentX + 3, y: currentY });

    if (pieceInRookPosition && pieceInRookPosition.type === 'rook' && pieceInRookPosition.totalMoves === 0)
      tryAddPosition(state, piece, { x: currentX + 2, y: currentY }, piecePositionMap, pieceValidPositionMap);
  }

  // Queen side castle
  if (
    !getPieceAtPosition(state, { x: currentX - 1, y: currentY }) &&
    !getPieceAtPosition(state, { x: currentX - 2, y: currentY }) &&
    !getPieceAtPosition(state, { x: currentX - 3, y: currentY })
  ) {
    const pieceInRookPosition = getPieceAtPosition(state, { x: currentX - 4, y: currentY });

    if (pieceInRookPosition && pieceInRookPosition.type === 'rook' && pieceInRookPosition.totalMoves === 0)
      tryAddPosition(state, piece, { x: currentX - 2, y: currentY }, piecePositionMap, pieceValidPositionMap);
  }

  return validPositions;
}

