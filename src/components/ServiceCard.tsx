import { Service } from "../types";
import { useEffect, useState } from "react";
import Button from "./Button";

type Props = {
    small?: boolean; 
    service: Service;
    selected?: Service[];
    handleSelection?: (value: Service) => void;
    handleDescriptionSelection?: (value: Service) => void
}

const ServiceCard = ({small,service, handleSelection,selected,handleDescriptionSelection}: Props) => {

  const [isSelected, setIsSelected] = useState(false)

  useEffect(()=>{
    const select = selected?.find((item) => item.service_id === service.service_id)
    setIsSelected(select ? true:false)
  },[selected,service.service_id])

  const handleClick  = () => {
    handleSelection?.(service)
  }
  
  const handleDescription = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleDescriptionSelection?.(service)
  }


  return (
    <div 
    className={`font-main
    ${small ? `min-w-[10rem] px-5 h-auto bg-black text-white hover:scale-100`:`w-full bg-white text-black hover:scale-110`}
    ${isSelected ? `border-cyan-500`:`hover:border-cyan-500`}
    col-span-1 h-[10rem] cursor-pointer rounded-xl hover:shadow-2xl border-2 
    flex flex-col items-center justify-center gap-2 text-center py-5 z-0 relative
    `}
    >   
        {small &&
            <div 
            onClick={handleClick}
            className="w-[30px] h-[30px] bg-red-600 absolute top-[-10px] right-[-10px] rounded-full flex flex-col items-center justify-center">
                X
            </div>
        }

        <div 
        onClick={handleClick}
        className="w-full h-full flex flex-col items-center justify-center">
            <h3 
            className={`
            ${small ? `text-base`:`text-xl`}
            ${''} tracking-widest`}>{service.title}</h3>
            <h4 
            className={`
            ${small ? `text-sm`:`text-base`}
            ${''} tracking-widest`}>₦ {service.price}</h4>
            <h5 
            className={`
            ${small ? `text-xs`:`text-sm`}
            ${''} tracking-widest`}>{service.service_duration} mins</h5>
        </div>
        {!small &&
          <Button
                  label={"More Info"}
                  onClick={handleDescription}
              />
        }
    </div>
  )
}

export default ServiceCard