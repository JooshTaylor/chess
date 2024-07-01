import { Piece } from "../../interfaces/Piece";
import { PiecePositionMap } from "../../utils/getPiecePositionMap";
import { Position } from "../../interfaces/Position";
import { GameState } from "../../reducers/GameReducer";
import { canTake, getPieceAtPosition, getPositionId, isValidSquare } from "../BoardHelper";
import { getInitialPiecePosition } from "../getInitialPiecePosition";
import { getValidPositionSet } from "../getValidPositions";

export function getValidPawnPositions(piece: Piece, state: GameState, piecePositionMap: PiecePositionMap): Set<string> {
  const { validPositions, addValidPosition } = getValidPositionSet();

  const { x: initialX, y: initialY } = getInitialPiecePosition(piece.id);
  const { x: currentX, y: currentY } = piecePositionMap[piece.id];

  const isAtStartingPosition = initialX === currentX && initialY === currentY;

  if (piece.colour === 'white') {
    let targetY = currentY + 1;
    let pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

    // Forward once
    if (isValidSquare(currentX, targetY) && !pieceAtPosition) {
      addValidPosition(currentX, targetY);

      // Forward twice
      if (isAtStartingPosition) {
        targetY++;
        pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

        if (isValidSquare(currentX, targetY) && !pieceAtPosition)
          addValidPosition(currentX, targetY);
      }
    }

    targetY = currentY + 1;

    // Top left
    let targetX = currentX - 1;
    addDiagonal(validPositions, piece, state, { x: targetX, y: targetY });

    // Top right
    targetX += 2;
    addDiagonal(validPositions, piece, state, { x: targetX, y: targetY });

    return validPositions;
  }

  // Black pawns
  let targetY = currentY - 1;
  let pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

  // Forward once
  if (isValidSquare(currentX, targetY) && !pieceAtPosition) {
    addValidPosition(currentX, targetY);

    // Forward twice
    if (isAtStartingPosition) {
      targetY--;
      pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

      if (isValidSquare(currentX, targetY) && !pieceAtPosition)
        addValidPosition(currentX, targetY);
    }
  }

  targetY = currentY - 1;

  // Top left
  let targetX = currentX - 1;
  addDiagonal(validPositions, piece, state, { x: targetX, y: targetY });

  // Top right
  targetX += 2;
  addDiagonal(validPositions, piece, state, { x: targetX, y: targetY });

  return validPositions;
}

function addDiagonal(set: Set<string>, piece: Piece, state: GameState, targetPosition: Position): void {
  const pieceAtPosition = getPieceAtPosition(state, targetPosition);

  if (isValidSquare(targetPosition.x, targetPosition.y) && pieceAtPosition && canTake(piece, pieceAtPosition))
    set.add(getPositionId(targetPosition));
}