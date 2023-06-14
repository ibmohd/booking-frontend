"use client"

import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'



type Props = {
    label: string;
    icon: IconType;
    disabled: boolean;
    url: string;
}

const StepComponent = ({icon:Icon, label, disabled,url}: Props) => {
  
  const navigate = useNavigate()

  const [show, setShow] = useState<boolean>(!disabled)

  useEffect(() => {
    setShow(!disabled)
  }, [disabled])
  

  const handleClick = () => {
    if(!disabled){
      navigate(url)
    }
  }

  return (
    <div
    onClick={() => handleClick()}
    className={`
    ${show ? `animate-icon-loading relative `:``}
    ${disabled ? `cursor-not-allowed`:`cursor-pointer`}
    ${!disabled ? `bg-green-600`:`bg-red-600`}
    w-20 h-20 flex flex-col items-center justify-center relative border-2 border-black`}>
      {show ? <AiOutlineCheck size={30} color='white'/>:<Icon size={30} color='white'/>}
      <div className={`${'font-marker'} pt-5 hidden absolute md:bottom-[-50%] w-[20vw] text-center md:flex items-center justify-center text-sm lg:text-base tracking-normal`}>
        {label}
      </div>
      {show && (<div className="absolute inset-0 rounded-full bg-red-600 opacity-0 hover:opacity-100 transition-opacity duration-100 flex items-center justify-center ease-in">
        <AiOutlineClose size={30} color='white'/>
      </div>)}
    </div>
  )
}

export default StepComponent