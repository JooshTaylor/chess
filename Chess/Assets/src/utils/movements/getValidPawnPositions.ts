import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { GameState } from "../../reducers/GameReducer";
import { getValidPositionSet } from "../getValidPositions";
import { Position } from "../../interfaces/Position";
import { getPieceAtPosition } from "../getPieceAtPosition";
import { getPositionId } from "../getPositionId";
import { isValidPosition } from "../isValidPosition";
import { getEnPassantTargetPosition } from "../getEnPassantTargetPosition";

export function getValidPawnPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap): Set<string> {
  const { validPositions } = getValidPositionSet();

  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  function tryAddForwardPosition(position: Position, canTake: boolean) {
    if (!isValidPosition(position))
      return { canContinueInDirection: false };

    const pieceAtPosition = getPieceAtPosition(state, position);

    if (!pieceAtPosition) {
      validPositions.add(getPositionId(position));
      return { canContinueInDirection: true };
    }

    if (canTake && piece.colour !== pieceAtPosition.colour)
      validPositions.add(getPositionId(position));

    return { canContinueInDirection: false };
  }

  function tryAddDiagonalPosition(position: Position) {
    if (!isValidPosition(position))
      return;

    const pieceAtPosition = getPieceAtPosition(state, position);

    if (pieceAtPosition) {
      if (pieceAtPosition.colour === piece.colour)
        return;

      validPositions.add(getPositionId(position));
      return;
    }

    // En passant check
    const enPassantPosition = getEnPassantTargetPosition(piece.colour, position);
    const pieceAtEnPassantPosition = getPieceAtPosition(state, enPassantPosition);

    if (!pieceAtEnPassantPosition || pieceAtEnPassantPosition.colour === piece.colour || pieceAtEnPassantPosition.type !== 'pawn')
      return;

    if (pieceAtEnPassantPosition.totalMoves === 1 && pieceAtEnPassantPosition.turnsSinceLastMove === 0) {
      validPositions.add(getPositionId(position));
      return;
    }
  }

  if (piece.colour === 'white') {
    // Forward once
    const { canContinueInDirection } = tryAddForwardPosition({ x: currentX, y: currentY + 1 }, false);

    // Forward twice
    if (piece.totalMoves === 0 && canContinueInDirection)
      tryAddForwardPosition({ x: currentX, y: currentY + 2 }, false);

    // Top left
    tryAddDiagonalPosition({ x: currentX - 1, y: currentY + 1 })

    // Top right
    tryAddDiagonalPosition({ x: currentX + 1, y: currentY + 1 })

    return validPositions;
  }

  // Black pawns

  // Forward once
  const { canContinueInDirection } = tryAddForwardPosition({ x: currentX, y: currentY - 1 }, false);

  // Forward twice
  if (piece.totalMoves === 0 && canContinueInDirection)
    tryAddForwardPosition({ x: currentX, y: currentY - 2 }, false);

  // Top left
  tryAddDiagonalPosition({ x: currentX - 1, y: currentY - 1 })

  // Top right
  tryAddDiagonalPosition({ x: currentX + 1, y: currentY - 1 })

  return validPositions;
}