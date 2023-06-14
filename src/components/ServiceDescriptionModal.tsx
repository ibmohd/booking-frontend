import Modal from "./Modal"
import { Service } from "../types";

type Props = {
    handleOpen: (value:boolean) => void;
    handleSelection: (service:Service) => void
    selectedServices: Service[];
    service?: Service;
    open?: boolean;
}

const ServiceDescriptionModal = ({handleOpen,open,handleSelection,service,selectedServices}:Props) => {

  if(!service) return null


  const bodyContent = (
    <div className='flex flex-col gap-4 items-center tracking-widest'>
        <div className="flex items-center justify-around w-full ">
            <h3 className="font-marker text-xl">₦{service.price}</h3>
            <h3 className="font-marker text-xl">{service.service_duration}mins</h3>
        </div>
        <p className="w-full p-10 flex items-center justify-center font-main">
            {service.description}
        </p>
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
        <hr />

    </div>
  )
  
  return (
    <Modal
        disabled={false}
        isOpen={open}
        title={`${service.title}`}
        actionLabel={selectedServices.includes(service) ? `Remove`:`Add`}
        onClose={() => handleOpen(false)}
        onSubmit={() => handleSelection(service)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default ServiceDescriptionModal