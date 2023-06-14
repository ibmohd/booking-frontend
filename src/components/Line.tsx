import {useEffect,useState} from 'react'

type Props = {
    show: boolean;
}

const Line = ({show:value}: Props) => {

  const [show, setShow] = useState<boolean>(value)

  useEffect(() => {
    setShow(value)
  }, [value])

  return (
    <div className={`${ show ? `animate-loading` :`bg-black`} h-1 flex-grow`}></div>
  )
}

export default Line