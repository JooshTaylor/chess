import { PieceId } from "../../interfaces/Piece"
import { PieceType } from "../../interfaces/PieceType";

interface PromotionModalProps {
  pieceId: PieceId;
  onPromote: (currentPieceId: PieceId, promotionType: PieceType) => void;
}

export function PromotionModal(props: PromotionModalProps): JSX.Element {
  return (
    <div>
      {props.pieceId}
    </div>
  )
}