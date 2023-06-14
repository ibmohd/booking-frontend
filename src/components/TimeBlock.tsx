import {BsFillSunsetFill,BsFillMoonFill, BsFillSunFill} from 'react-icons/bs'

type Props = {
    time: string
    setTime: (value: string) => void;
    selectedTime: string | null | undefined;
}

const TimeBlock = ({time,setTime,selectedTime}: Props) => {



  return (
    <div
    onClick={() => setTime(time)}
    className={`
    ${selectedTime === time ? `border-4 border-blue-600`:`border-0`}
    ${time < "15:00:00" ? 'bg-[#fff6cf] text-black' : time < "18:00:00" ? `bg-[#6DD9DB] text-[#F4F6EB]`:`bg-[#1e2b58] text-white`}
    col-span-1 flex items-center justify-center h-12 rounded-md cursor-pointer gap-3 hover:border-4 border-blue-500
    `}
    >
      {time < "15:00:00" ? <BsFillSunFill size={30} className='text-[#ffdb00]'/> : time < "18:00:00" ? <BsFillSunsetFill size={20} className='text-[#F7c95d]'/>:<BsFillMoonFill size={20} className='text-[#48459a]'/>}
      {time.slice(0,5)}
    </div>
  )
}

export default TimeBlock