import { INITIAL_GAME_STATE } from "../../constants/InitialGameState";
import { Piece } from "../../interfaces/Piece";
import { Position } from "../../interfaces/Position";
import { GameState } from "../../reducers/GameReducer";
import { canTake, getPieceAtPosition, getPositionId, isValidSquare } from "../BoardHelper";
import { getValidPositionSet } from "../getValidPositions";
import { willMoveLeadToCheck } from "../willMoveLeadToCheck";

export function getValidPawnPositions(piece: Piece, state: GameState): Set<string> {
  const { validPositions, addValidPosition } = getValidPositionSet();

  const { x: initialX, y: initialY } = INITIAL_GAME_STATE.pieces[piece.id];
  const { x: currentX, y: currentY } = piece;

  const isAtStartingPosition = initialX === currentX && initialY === currentY;

  if (piece.colour === 'white') {
    let targetY = currentY + 1;
    let pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

    // Forward once
    if (isValidSquare(currentX, targetY) && !pieceAtPosition) {
      if (!willMoveLeadToCheck(state, { x: currentX, y: targetY }, state.turnColour))
        addValidPosition(currentX, targetY);

      // Forward twice
      if (isAtStartingPosition) {
        targetY++;
        pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

        if (isValidSquare(currentX, targetY) && !pieceAtPosition && !willMoveLeadToCheck(state, { x: currentX, y: targetY }, state.turnColour))
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
    if (!willMoveLeadToCheck(state, { x: currentX, y: targetY }, state.turnColour))
      addValidPosition(currentX, targetY);

    // Forward twice
    if (isAtStartingPosition) {
      targetY--;
      pieceAtPosition = getPieceAtPosition(state, { x: currentX, y: targetY });

      if (isValidSquare(currentX, targetY) && !pieceAtPosition&& !willMoveLeadToCheck(state, { x: currentX, y: targetY }, state.turnColour))
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

  if (isValidSquare(targetPosition.x, targetPosition.y) && pieceAtPosition && canTake(piece, pieceAtPosition) && !willMoveLeadToCheck(state, targetPosition, state.turnColour))
    set.add(getPositionId(targetPosition));
}