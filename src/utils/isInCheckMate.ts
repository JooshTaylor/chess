import { PieceColour } from "../interfaces/PieceColour";
import { GameReducer, GameState } from "../reducers/GameReducer";
import { getMoveAction } from "./getMoveAction";
import { PiecePositionMap, getPiecePositionMap } from "./getPiecePositionMap";
import { PieceValidPositionsMap, getPieceValidPositionsMap } from "./getPieceValidPositionsMap";
import { isInCheck } from "./isInCheck";

/**
 * Check mate is detected when the current player is in check,
 * and there are no possible moves for them to make that get them out of check.
 * 
 * So, in this function we enumerate every possible move that the current player can make and
 * try to find one that will get us out of check.
 */
export function isInCheckMate(state: GameState, colour: PieceColour, piecePositionMap: PiecePositionMap, pieceValidPositionsMap: PieceValidPositionsMap): boolean {
  /**
   * Checking if we're in check mate is expensive. We only do this when we know that we are
   * currently in check, as checking that first is cheaper.
   */
  if (!isInCheck(state, colour, piecePositionMap, pieceValidPositionsMap))
    return false;

  // First step is to loop through every piece that the player can use
  for (const piece of Object.values(state.pieces)) {
    if (piece.colour !== colour || piece.status === 'dead')
      continue;

    const mockState: GameState = {
      ...state,
      selectedPiece: piece.id
    };

    const validPositions = pieceValidPositionsMap[piece.id];

    // Then we enumerate through each pieces valid moves
    for (const validPosition of validPositions) {
      const [ x, y ] = validPosition.split(':');

      // For each valid move, we want to get the state that the game would be in after making that move
      const futureState = GameReducer(mockState, getMoveAction(mockState, { x: Number(x), y: Number(y) }, piecePositionMap));
      const futurePositionsMap = getPiecePositionMap(futureState.positions);
      const futureValidPositionsMap = getPieceValidPositionsMap(futureState, futurePositionsMap);

      // If in this state, we are not in check, then that means we are not in check mate
      if (!isInCheck(futureState, colour, futurePositionsMap, futureValidPositionsMap))
        return false;
    }
  }

  // If none of the available moves could get us out of check, then we are in check mate and the game will end.
  return true;
}