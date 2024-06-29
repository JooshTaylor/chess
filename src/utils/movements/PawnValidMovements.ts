import { INITIAL_GAME_STATE } from "../../constants/InitialGameState";
import { Piece } from "../../interfaces/Piece";
import { GameState } from "../../reducers/GameReducer";
import { canTake, getPieceAtPosition, isValidSquare } from "../BoardHelper";

export function pawnValidMovements(piece: Piece, state: GameState): Set<string> {
  const validPositions = new Set<string>([]);

  const { x: initialX, y: initialY } = INITIAL_GAME_STATE.pieces[piece.id];
  const { x: currentX, y: currentY } = piece;

  const isAtStartingPosition = initialX === currentX && initialY === currentY;

  if (piece.colour === 'white') {
    let targetY = currentY + 1;
    let pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

    // Forward once
    if (isValidSquare(currentX, targetY) && !pieceAtPosition) {
      validPositions.add(`${currentX}:${targetY}`);

      // Forward twice
      if (isAtStartingPosition) {
        targetY++;
        pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

        if (isValidSquare(currentX, targetY) && !pieceAtPosition)
          validPositions.add(`${currentX}:${targetY}`);
      }
    }

    targetY = currentY + 1;

    // Top left
    let targetX = currentX - 1;
    addDiagonal(validPositions, piece, state, targetX, targetY);

    // Top right
    targetX -= 2;
    addDiagonal(validPositions, piece, state, targetX, targetY);

    return validPositions;
  }

  // Black pawns
  let targetY = currentY - 1;
  let pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

  // Forward once
  if (isValidSquare(currentX, targetY) && !pieceAtPosition) {
    validPositions.add(`${currentX}:${targetY}`);

    // Forward twice
    if (isAtStartingPosition) {
      targetY--;
      pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

      if (isValidSquare(currentX, targetY) && !pieceAtPosition)
        validPositions.add(`${currentX}:${targetY}`);
    }
  }

  targetY = currentY - 1;

  // Top left
  let targetX = currentX - 1;
  addDiagonal(validPositions, piece, state, targetX, targetY);

  // Top right
  targetX -= 2;
  addDiagonal(validPositions, piece, state, targetX, targetY);

  return validPositions;
}

function addDiagonal(set: Set<string>, piece: Piece, state: GameState, targetX: number, targetY: number): void {
  const pieceAtPosition = getPieceAtPosition(state, { x: targetX, y: targetY });

  if (isValidSquare(targetX, targetY) && pieceAtPosition && canTake(piece, pieceAtPosition))
    set.add(`${targetX}:${targetY}`);
}