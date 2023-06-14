


import React from 'react'
import {useNavigate} from 'react-router-dom'


type Props = {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    redirect?: string;

}

const Button = ({label, onClick, disabled, redirect}: Props) => {


  const navigate = useNavigate()

  return (
    <button 
    onClick={redirect ? () => navigate(redirect): onClick}
    disabled={disabled}
    className={`
    bg-black text-white tex-center hover:bg-neutral-900 hover:border-cyan-800 border-2 py-2 z-10
    relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-4/5`}>
        {label}
    </button>
  )
}

export default Button