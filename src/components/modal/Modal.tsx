import './modal.css';

interface ModalProps {
  title: string;
}

export function Modal(props: React.PropsWithChildren<ModalProps>): JSX.Element {
  return (
    <div className='modal'>
      <h2 className='modal-header'>
        {props.title}
      </h2>
      <div className='modal-body'>
        {props.children}
      </div>
    </div>
  )
}