import { Grid } from "../Grid";
import { Position } from "../Position";

export type Piece = {
  name: string;
  getValidPositions: (currentPosition: Position, board: Grid) => Set<Position>;
};