import { useCallback, useEffect, useState } from 'react' 
import { Service } from '../types'
import ServiceCard from '../components/ServiceCard'
import Arrow from '../components/Arrow'
import {useLocation, useNavigate} from 'react-router-dom'
import ServiceDescriptionModal from '../components/ServiceDescriptionModal'
import LoadingComponent from '../components/LoadingComponent'


const ServicesPage = () => {
  
  const [services, setServices] = useState<Service[]>([])
  const [selected, setSelected] = useState<Service[]>([])
  const [descriptionSelection, setDescriptionSelection] = useState<Service>()
  const [open, setOpen] = useState<boolean>()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    const getServices = async () => {
      const data = await fetch("https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/services/all")
      .then(async (res) => {
        if(!res.ok){
          throw new Error("Failed to fetch data")
        }
        const d = await res.json()
        return d
      })
      setServices(data.services)
    }

    getServices()

  },[])

  // const encryptArray = (array:any,secretKey:string,path:string) => {
  //   const jsonString = JSON.stringify(array);
  //   const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  //   const urlSafeCiphertext = encodeURIComponent(encrypted);
  //   const url = `${path}/services/${urlSafeCiphertext}`;
  //   return url;
  // }
  
  const handleClick = useCallback(() => {

    const selectedArray = selected.map((service) => service.service_id)
    const currentPath = location.pathname
    
    const urlSafeString = selectedArray.map(str => encodeURIComponent(str).concat(","))
    // const redirectUrl = encryptArray(selectedArray,"super-secret-passowrd",currentPath)
    const redirectUrl = `${currentPath}/${urlSafeString}/date`
    navigate(redirectUrl)
    
  },[selected,location.pathname,navigate])

  const handleSelection = (value:Service) => {
    const isSelected = selected.find(selection => value.service_id === selection.service_id)
    if(isSelected){
        const newSelection = selected.filter((item) => item.service_id !== value.service_id)
        setSelected(newSelection)
        return
    }
    setSelected([...selected,value])
  }

  const handleDescriptionSelection = (value:Service) => {
    setDescriptionSelection(value)
    handleOpen(true)
  }

  const handleOpen = (value:boolean) => {
    setOpen(value)
  }

  //LOADING CONDITION
  if(!services){
    return (
      <LoadingComponent/>
    )
  }

  return (
    <>
            {/* CHOSEN SERVICES CAROUSEL */}
            {selected.length > 0 && (
                <div className='pt-4 flex flex-row items-center justify-center overflow-x-auto gap-5 mt-20'>
                    {selected.map((service,index) => (
                        <ServiceCard key={index} service={service} small={true} handleSelection={handleSelection}/>
                    ))}
                </div>
            )}

            {/* MAIN BODY */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 py-5 h-auto mt-10'>
                {services?.map((service,index) => (
                    <ServiceCard key={index} service={service} selected={selected} handleSelection={handleSelection} handleDescriptionSelection={handleDescriptionSelection}/>
                    ))
                }
            </div>

            {/* PROGRESS ARROW */}
            <Arrow label={'Choose A Time'} onClick={handleClick} showCondition={selected.length>0}/>
            
            <ServiceDescriptionModal open={open} handleOpen={handleOpen} handleSelection={handleSelection} service={descriptionSelection} selectedServices={selected}/>
        </>
  )
}

export default ServicesPage