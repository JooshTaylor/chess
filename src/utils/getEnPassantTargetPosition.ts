import { PieceColour } from "../interfaces/PieceColour";
import { Position } from "../interfaces/Position";

export function getEnPassantTargetPosition(colour: PieceColour, targetPosition: Position): Position {
  if (colour === 'white') {
    return { x: targetPosition.x, y: targetPosition.y - 1 };
  } else {
    return { x: targetPosition.x, y: targetPosition.y + 1 };
  }
}