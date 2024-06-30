import { PieceColour } from "../interfaces/PieceColour";
import { GameReducer, GameState } from "../reducers/GameReducer";
import { getMoveAction } from "./getMoveAction";
import { getKingVulnerabilities } from "./getKingVulnerabilities";
import { Position } from "../interfaces/Position";

export function willMoveLeadToCheck(state: GameState, targetPosition: Position, turnColour: PieceColour): boolean {
  const action = getMoveAction(state, targetPosition, { validatePositions: false });

  if (!action)
    return false;

  // Simulate a state update
  const futureState = GameReducer(state, action);

  return isInCheck(futureState, turnColour);
}

export function isInCheck(state: GameState, turnColour: PieceColour): boolean {
  return getKingVulnerabilities(state, turnColour).size > 0;
}