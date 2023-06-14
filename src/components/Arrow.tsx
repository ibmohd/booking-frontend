"use client"
import {TbArrowBigRightLines} from 'react-icons/tb'
// import { Permanent_Marker } from 'next/font/google'
// const font = Permanent_Marker({weight:"400", subsets:["latin"]})

type Props = {
    onClick: () => void;
    label: string;
    showCondition: boolean;
}

const Arrow = ({onClick,label,showCondition}: Props) => {
  return (
    <div 
    onClick={onClick}
    className={`
    ${showCondition ? `translate-x-0`:`translate-x-80`}
    ${''} text-xl opacity-60 hover:opacity-100 transition duration-150 ease-linear
    px-5 z-20 border-y-2 border-l-2 border-black
    fixed right-0 bottom-[10%] flex w-80 h-20 cursor-pointer bg-yellow-400 flex-row justify-between items-center `}>
        <div className='w-full h-full flex items-center justify-center'>
            {label}
        </div>
        <TbArrowBigRightLines size={60} color='black'/>
    </div>
  )
}

export default Arrow