interface ModalProps {
  title: string;
}

export function Modal(props: React.PropsWithChildren<ModalProps>): JSX.Element {
  return (
    <div className='fixed top-1/4 left-1/2 -translate-x-1/2 w-80 bg-white rounded-lg'>
      <h2 className='border border-b-2 border-b-gray-400 m-0 px-1 py-2 text-lg'>
        {props.title}
      </h2>
      <div className='p-1'>
        {props.children}
      </div>
    </div>
  )
}