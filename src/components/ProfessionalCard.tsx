import { useCallback, useEffect, useState } from 'react';
import { Professional, Schedule } from '../types';
import {useNavigate} from 'react-router-dom'
// import { Permanent_Marker,Signika } from "next/font/google";

type Props = {
    professional: Professional;
}

const ProfessionalCard = ({professional}: Props) => {

  const [nextAvail, setNextAvail] = useState<Schedule>()
  const navigate = useNavigate()


  useEffect(()=>{
    const getAvailability = async (id:string) => {
      const data = await fetch(`https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/schedules/get-by-employee/${id}`)
      .then(async (res) => {
        if(!res.ok){
          throw new Error("Failed to fetch data")
        }
        const d = await res.json()
        return d
      })
      setNextAvail(data.schedules[0])
    }

    getAvailability(professional.employee_id)

  },[professional.employee_id])

  const handleClick = useCallback(() => {

    navigate(`/reserve/professional/${professional.employee_id}/services`)

  },[navigate,professional.employee_id])

  
  const available_date = nextAvail && new Date(new Date(nextAvail?.scheduled_date).toLocaleDateString('en-US', {timeZone: 'UTC'})).toDateString()

  
  return (
    <div
        onClick={handleClick}
        className={`

        col-span-1 cursor-pointer bg-white text-black  w-full h-[20rem] rounded-xl hover:shadow-2xl`}
    >
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 hover:scale-110">
            <img
                src={professional.imageSrc}
                alt='Professional'
                width={100}
                height={100}
                className="rounded-full w-[10em] h-[10em] object-cover"
            />
            <h3
                className={`${'font-marker'} text-xl`}
            >
                {professional.firstname} {professional.lastname}
            </h3>
            <span
                className={`${'font-main'} flex flex-col text-center items-center text-md`}
            >
                Next Availability
                <h4 className="font-thin text-sm">
                    {nextAvail ? available_date:'Currently Unavailable'}
                </h4>
            </span>
        </div>
    </div>  
  )
}

export default ProfessionalCard