"use client"

import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

type Props = {
    disabledDates?: Date[]
    selected: Date
    onChange: (value:Date) => void;
}

const minDate = new Date()
const maxDate = new Date()
maxDate.setDate(minDate.getDate() + 60)


const CalendarComponent = ({onChange,disabledDates,selected}: Props) => {
  return (
    <Calendar
      color='#03256C'
      date={selected}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      maxDate={maxDate}
      disabledDates={disabledDates}
      onChange={onChange}
      className='border-2 border-black rounded-xl'
    />
  )
}

export default CalendarComponent