import { Position } from "../interfaces/Position";

export function getPositionId(position: Position): `${number}:${number}` {
  if (!position)
    return null;

  return `${position.x}:${position.y}`;
}