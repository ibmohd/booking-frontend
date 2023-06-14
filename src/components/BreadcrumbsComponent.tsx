import Line from "./Line"
import StepComponent from "./StepComponent"
import {IoMdPerson} from 'react-icons/io'
import {MdRoomService,MdOutlineReceiptLong} from 'react-icons/md'
import {BsClock} from 'react-icons/bs'
import {useParams} from 'react-router-dom'


const BreadcrumbsComponent = () => {

    const {professional,services,date,time} = useParams()

  return (
    <div className="flex items-center w-full px-5 lg:px-[10%]">
    <StepComponent disabled={(professional) ? false:true} label={'Professional'} icon={IoMdPerson} url={'/reserve/professional'}/>
    <Line show={(professional) ? true:false}/>
    <StepComponent disabled={(professional&&services) ? false:true} label={'Services'} icon={MdRoomService} url={`/reserve/professional/${professional}/services`}/>
    <Line show={(professional&&services) ? true:false}/>
    <StepComponent disabled={(professional&&services&&time&&date) ? false:true} label={'Time'} icon={BsClock} url={`/reserve/professional/${professional}/services/${services}/date`}/>
    <Line show={(professional&&services&&time&&date) ? true:false}/>
    <StepComponent disabled={true} label={'Reserve'} icon={MdOutlineReceiptLong} url={`/reserve/professional/${professional}/services/${services}/date/${date}/time/${time}`}/>
  </div>
  )
}

export default BreadcrumbsComponent