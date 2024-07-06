import { Position } from "../interfaces/Position";

export function isValidPosition(position: Position): boolean {
  return position.x > 0 && position.y > 0 && position.x < 9 && position.y < 9;
}