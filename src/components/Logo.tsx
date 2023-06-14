"use client"

// import { Abril_Fatface } from "next/font/google"
import {useLocation, useNavigate} from 'react-router-dom'

// const font = Abril_Fatface({weight:"400", subsets: ['latin'] })



type Props = {
    title:string;
}

const Logo = ({title}: Props) => {

  const homepage = useLocation().pathname
  const navigate = useNavigate()

  if(homepage === '/'){
    return null
  }
  
  return (
    <div 
    onClick={() => navigate('/reserve/professional')}
    className={`${'font-title'} tracking-widest ml-[5%] bg-black text-white h-[75px] w-[300px]
        flex items-center justify-center text-4xl rounded-br-xl rounded-bl-xl cursor-pointer mb-20
    `}>
        {title}
    </div>
  )
}

export default Logo