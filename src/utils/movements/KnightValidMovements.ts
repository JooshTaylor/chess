import { Grid } from "../../interfaces/Grid";
import { Position } from "../../interfaces/Position";
import { IKnight } from "../../interfaces/pieces/IKnight";
import { splitPosition, convertCharToNumber, getPieceAtPosition, canTake, convertNumberToChar } from "../BoardHelper";

export function knightValidMovements(piece: IKnight, position: Position, board: Grid): Set<Position> {
  const validPositions = new Set<Position>([]);

  const add = (x: number, y: number) => validPositions.add(`${convertNumberToChar(x)}:${y}`);

  const isValidSquare = (x: number, y: number) => x > 0 && y > 0 && x < 9 && y < 9;

  const [ x, y ] = splitPosition(position);

  const xNumeric = convertCharToNumber(x);
  const yNumeric = Number(y);

  // Top left

  let currentX = xNumeric - 1;
  let currentY = yNumeric + 2;

  let pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
  if (isValidSquare(currentX, currentY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(currentX, currentY);

  // Top right

  currentX = xNumeric + 1;
  currentY = yNumeric + 2;

  pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
  if (isValidSquare(currentX, currentY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(currentX, currentY);

  // Right top

  currentX = xNumeric + 2;
  currentY = yNumeric + 1;

  pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
  if (isValidSquare(currentX, currentY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(currentX, currentY);

  // Right bottom

  currentX = xNumeric + 2;
  currentY = yNumeric - 1;

  pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
  if (isValidSquare(currentX, currentY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(currentX, currentY);

  // Bottom right

  currentX = xNumeric + 1;
  currentY = yNumeric - 2;

  pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
  if (isValidSquare(currentX, currentY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(currentX, currentY);

  // Bottom left

  currentX = xNumeric - 1;
  currentY = yNumeric - 2;

  pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
  if (isValidSquare(currentX, currentY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(currentX, currentY);

  // Left bottom

  currentX = xNumeric - 2;
  currentY = yNumeric - 1;

  pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
  if (isValidSquare(currentX, currentY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(currentX, currentY);

  // Left top

  currentX = xNumeric - 2;
  currentY = yNumeric + 1;

  pieceAtPosition = getPieceAtPosition(board, currentX, currentY);
  if (isValidSquare(currentX, currentY) && (!pieceAtPosition || canTake(piece, pieceAtPosition)))
    add(currentX, currentY);

  return validPositions;
}