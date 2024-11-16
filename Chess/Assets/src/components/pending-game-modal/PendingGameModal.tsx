import { Modal } from "../modal/Modal";

export function PendingGameModal(): JSX.Element {
  return (
    <Modal title={`Waiting for another player`}>
      Send this link to another player to start the game.
    </Modal>
  )
}