import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";
import { canTake, getPieceAtPosition, isValidSquare } from "../BoardHelper";
import { getValidPositionSet } from "../getValidPositions";
import { willMoveLeadToCheck } from "../willMoveLeadToCheck";

export function getValidKingPositions(piece: Piece, state: GameState): Set<string> {
  const { validPositions, addValidPosition } = getValidPositionSet();

  function addIfValid(x: number, y: number): void {
    const pieceAtPosition = getPieceAtPosition(state, { x, y });
  
    if (isValidSquare(x, y) && (!pieceAtPosition || canTake(piece, pieceAtPosition)) && !willMoveLeadToCheck(state, { x, y }, state.turnColour))
      addValidPosition(x, y);
  }

  const { x: currentX, y: currentY } = piece;

  // Up
  addIfValid(currentX, currentY + 1);

  // Top right
  addIfValid(currentX + 1, currentY + 1);

  // Right
  addIfValid(currentX + 1, currentY);

  // Bottom right
  addIfValid(currentX + 1, currentY - 1);

  // Down
  addIfValid(currentX, currentY - 1);

  // Down left
  addIfValid(currentX - 1, currentY - 1);

  // Left
  addIfValid(currentX - 1, currentY);

  // Top left
  addIfValid(currentX - 1, currentY + 1);

  if (piece.totalMoves > 0)
    return validPositions; 

  // King side castle
  if (!getPieceAtPosition(state, { x: currentX - 1, y: currentY }) && !getPieceAtPosition(state, { x: currentX - 2, y: currentY })) {
    const pieceInRookPosition = getPieceAtPosition(state, { x: currentX - 3, y: currentY });

    if (pieceInRookPosition && pieceInRookPosition.type === 'rook' && pieceInRookPosition.totalMoves === 0)
      addValidPosition(currentX - 2, currentY);
  }

  // Queen side castle
  if (
    !getPieceAtPosition(state, { x: currentX + 1, y: currentY }) &&
    !getPieceAtPosition(state, { x: currentX + 2, y: currentY }) &&
    !getPieceAtPosition(state, { x: currentX + 3, y: currentY })
  ) {
    const pieceInRookPosition = getPieceAtPosition(state, { x: currentX + 4, y: currentY });

    if (pieceInRookPosition && pieceInRookPosition.type === 'rook' && pieceInRookPosition.totalMoves === 0)
      addValidPosition(currentX + 2, currentY);
  }

  return validPositions;
}

