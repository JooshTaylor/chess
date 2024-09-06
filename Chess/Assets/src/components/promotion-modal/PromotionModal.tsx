import { PieceType } from "../../interfaces/PieceType";
import { Modal } from "../modal/Modal";

interface PromotionOptionProps {
  type: PieceType;
  onSelect: () => void;
}

function PromotionOption(props: PromotionOptionProps): JSX.Element {
  function getName(): string {
    switch (props.type) {
      case 'bishop':
        return 'Bishop';
      case 'knight':
        return 'Knight';
      case 'queen':
        return 'Queen';
      case 'rook':
        return 'Rook';
      default:
        return '';
    }
  }

  return (
    <li>
      <button onClick={props.onSelect} className='w-full text-left mb-1'>
        {getName()}
      </button>
    </li>
  )
}

interface PromotionModalProps {
  onPromote: (promotionType: PieceType) => void;
}

export function PromotionModal(props: PromotionModalProps): JSX.Element {
  return (
    <Modal title={`Pawn promotion`}>
      <p>
        Select a piece to promote your pawn to:
      </p>
      <ul>
        <PromotionOption type='queen' onSelect={() => props.onPromote('queen')} />
        <PromotionOption type='rook' onSelect={() => props.onPromote('rook')} />
        <PromotionOption type='bishop' onSelect={() => props.onPromote('bishop')} />
        <PromotionOption type='knight' onSelect={() => props.onPromote('knight')} />
      </ul>
    </Modal>
  )
}