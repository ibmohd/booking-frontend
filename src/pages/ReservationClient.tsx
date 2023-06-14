import useStepState from '../hooks/useStepState'

import ServicesPage from './ServicesPage'
import ProfessionalPage from './ProfessionalPage'
import DatePage from './DatePage'
import ReservationPage from './ReservationPage'

enum STEPS {
  PROFESSIONAL = 0,
  SERVICES = 1,
  TIME = 2,
  RESERVE = 3
}

const ReservationClient = () => {

  const stepState = useStepState()

  console.log(stepState.step)

  let bodyContent = ( 
    <div className='w-full h-full'>
      <ProfessionalPage/>
    </div>
  )

  if(stepState.step === STEPS.SERVICES){
    
    bodyContent = (
        <div className='w-full h-full'>
          <ServicesPage/>
        </div>
    )
  }

  if(stepState.step === STEPS.TIME){
    bodyContent = (
        <div className='w-full h-full'>
          <DatePage/>
        </div>
    )

  }

  if(stepState.step === STEPS.RESERVE){
    bodyContent = (
        <div className='w-full h-full'>
          <ReservationPage/>
        </div>
    )

  }
  
  
  return (
    <div className='flex flex-col items-center justify-center'>
      {bodyContent}
    </div>
  )
}

export default ReservationClient