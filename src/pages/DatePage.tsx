import {useParams, useNavigate} from 'react-router-dom'
import { useCallback, useEffect,useState } from 'react'
import Arrow from '../components/Arrow'
import CalendarComponent from '../components/CalanderComponent'
import TimeBlock from '../components/TimeBlock'
import {parseISO} from 'date-fns'
import LoadingComponent from '../components/LoadingComponent'


const DatePage = () => {

  const {professional,services} = useParams()
  const [selectedDate, setSelectedDate] = useState(new Date()) 
  const [availableDates, setAvailableDates] = useState<Date[]>()
  const [timeBlocks, setTimeBlocks] = useState<string[]>()
  const [schedules, setSchedules] = useState<{
      date:string
      id:string
    }[]>()

  const [selectedTime, setSelectedTime] = useState<string>()
  const navigate = useNavigate()
  
  useEffect(()=>{
    const getSchedules = async () => {
      const data = await fetch("https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/schedules/employee-availability",{
        method:"POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            employee_id: professional,
            date: selectedDate.toISOString()
        })
      })
      .then(async (res) => {
        if(!res.ok){
          throw new Error("Failed to fetch data")
        }
        const d = await res.json()
        return d
      })
      setSchedules(data.schedules)
      setAvailableDates(data.disabled_days)
    }

    getSchedules()

  },[professional,selectedDate])

  useEffect(()=>{

    const schedule = (date:Date) => {
        
        if(!schedules || schedule.length < 1) return
        const date_iso = date.toISOString()
        const date_date = new Date(date_iso).toLocaleDateString('en-US', {timeZone: 'UTC'})
        
        const id = schedules.filter(item => {
            const schedule_iso = item.date
            const schedule_date = new Date(schedule_iso).toLocaleDateString('en-US', {timeZone: 'UTC'})
            if(schedule_date === date_date){
                return item
            }
        })[0]?.id
        
        return id
    }

    const getTimeBlocks = async () => {
        const servicesArray = services?.split(',').filter(str => str.length>1 && decodeURIComponent(str))
        const id = schedule(selectedDate)
        const data = await fetch("https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/appointments/available-blocks",{
          method:"POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
              employee_id: professional,
              schedule: id ? id:'',
              services: servicesArray,
          })
        })
        .then(async (res) => {
          if(!res.ok){
            throw new Error("Failed to fetch data")
          }
          const d = await res.json()
          return d
        })
        setTimeBlocks(data)
      }
  
      getTimeBlocks()
    },[selectedDate,professional,schedules,services])

  const handleClick = useCallback(() => {
    const currentPath = location.pathname
    const validDate = encodeURIComponent(new Date(selectedDate).toISOString().slice(0,10).concat("T00:00:00.000Z"))
    const validTime = selectedTime && encodeURIComponent(selectedTime)
    const redirectUrl = `${currentPath}/${validDate}/time/${validTime}`
    navigate(redirectUrl)
    },[selectedDate,selectedTime,navigate])  

  const handleDateSelection = (value:Date) => {
    setSelectedDate(value)
  } 

  const handleTimeSelection = (value:string) => {
    setSelectedTime(value)
  }

  const disabledDates = availableDates?.map((date) => parseISO(date.toString()))


  //LOADING CONDITION
  if(!disabledDates){
    return (
      <LoadingComponent/>
    )
  }


  return (
    <div
    className=" min-h-[100vh] flex flex-col items-center px-2 mt-10 lg:flex-row lg:items-start lg:justify-around"
    >
        <div className="w-full lg:w-1/2 h-1/2 flex flex-col items-center justify-center lg:mt-10">
            <CalendarComponent onChange={handleDateSelection} selected={selectedDate} disabledDates={disabledDates}/>
        </div>
        <div className="w-full lg:w-2/5 h-1/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
            {timeBlocks?.map((time,index) => (
              <TimeBlock key={index} time={time} setTime={handleTimeSelection} selectedTime={selectedTime}/>
            ))}
        </div>

        {/* PROGRESS ARROW */}
        <Arrow label={"Reserve"} onClick={handleClick} showCondition={selectedTime ? true:false}/>
    </div>
  )
}


export default DatePage