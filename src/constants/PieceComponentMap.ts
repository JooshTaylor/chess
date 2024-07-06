import { Bishop } from "../components/pieces/Bishop";
import { King } from "../components/pieces/King";
import { Knight } from "../components/pieces/Knight";
import { Pawn } from "../components/pieces/Pawn";
import { PieceProps } from "../components/pieces/PieceProps";
import { Queen } from "../components/pieces/Queen";
import { Rook } from "../components/pieces/Rook";
import { PieceType } from "../interfaces/PieceType";

export const PieceComponentMap: Record<PieceType, (props: PieceProps) => JSX.Element> = {
  bishop: Bishop,
  king: King,
  knight: Knight,
  pawn: Pawn,
  queen: Queen,
  rook: Rook
};