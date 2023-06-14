

type Props = {
    toggle: boolean;
    setToggle:React.Dispatch<React.SetStateAction<boolean>>
}

const PaymentToggle = ({toggle,setToggle}: Props) => {
  return (
    <div className="w-full lg:w-[80%] flex flex-row items-center justify-between px-10 mt-10 text-2xl">
        <div className="">
            Reserve Only?
        </div>
        <div 
        onClick={() => setToggle(!toggle)}
        className={`${toggle ? `bg-gray-600`:`bg-green-600`} w-28 h-14 rounded-full flex items-center justify-evenly px-1 text-base relative cursor-pointer`}>
            <div 
            className={`${toggle ? `translate-x-[75%] lg:translate-x-[85%]`:`translate-x-0`} bg-white transform duration-100 ease-linear w-14 h-12 rounded-full absolute left-1 flex items-center justify-center`}>
               <h5 className="ml-1 text-black">{toggle ? `Yes`:`No`}</h5>
            </div>
        </div> 
    </div>
  )
}

export default PaymentToggle