import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getValidPositionSet } from "../getValidPositions";
import { getPieceAtPosition } from "../getPieceAtPosition";

export function getValidKingPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap): Set<string> {
  const { validPositions, tryAddPosition } = getValidPositionSet();

  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  // Up
  tryAddPosition(state, piece, { x: currentX, y: currentY + 1 });

  // Top right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY + 1 });

  // Right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY });

  // Bottom right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY - 1 });

  // Down
  tryAddPosition(state, piece, { x: currentX, y: currentY - 1 });

  // Down left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY - 1 });

  // Left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY });

  // Top left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY + 1 });

  if (piece.totalMoves > 0)
    return validPositions; 

  // King side castle
  if (!getPieceAtPosition(state, { x: currentX + 1, y: currentY }) && !getPieceAtPosition(state, { x: currentX + 2, y: currentY })) {
    const pieceInRookPosition = getPieceAtPosition(state, { x: currentX + 3, y: currentY });

    if (pieceInRookPosition && pieceInRookPosition.type === 'rook' && pieceInRookPosition.totalMoves === 0)
      tryAddPosition(state, piece, { x: currentX + 2, y: currentY });
  }

  // Queen side castle
  if (
    !getPieceAtPosition(state, { x: currentX - 1, y: currentY }) &&
    !getPieceAtPosition(state, { x: currentX - 2, y: currentY }) &&
    !getPieceAtPosition(state, { x: currentX - 3, y: currentY })
  ) {
    const pieceInRookPosition = getPieceAtPosition(state, { x: currentX - 4, y: currentY });

    if (pieceInRookPosition && pieceInRookPosition.type === 'rook' && pieceInRookPosition.totalMoves === 0)
      tryAddPosition(state, piece, { x: currentX - 2, y: currentY });
  }

  return validPositions;
}

