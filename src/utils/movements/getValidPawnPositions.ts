import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getInitialPiecePosition } from "../getInitialPiecePosition";
import { getValidPositionSet } from "../getValidPositions";

export function getValidPawnPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap): Set<string> {
  const { validPositions, tryAddPosition } = getValidPositionSet();

  const { x: initialX, y: initialY } = getInitialPiecePosition(piece.id);
  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  const isAtStartingPosition = initialX === currentX && initialY === currentY;

  if (piece.colour === 'white') {
    // Forward once
    tryAddPosition(state, piece, { x: currentX, y: currentY + 1 });

    // Forward twice
    if (isAtStartingPosition)
      tryAddPosition(state, piece, { x: currentX, y: currentY + 2 });

    // Top left
    tryAddPosition(state, piece, { x: currentX - 1, y: currentY + 1 });

    // Top right
    tryAddPosition(state, piece, { x: currentX + 1, y: currentY + 1 });

    return validPositions;
  }

  // Black pawns

  // Forward once
  tryAddPosition(state, piece, { x: currentX, y: currentY - 1 });

  // Forward twice
  if (isAtStartingPosition)
    tryAddPosition(state, piece, { x: currentX, y: currentY - 2 });

  // Top left
  tryAddPosition(state, piece, { x: currentX - 1, y: currentY - 1 });

  // Top right
  tryAddPosition(state, piece, { x: currentX + 1, y: currentY - 1 });

  return validPositions;
}