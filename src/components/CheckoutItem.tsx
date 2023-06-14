

type Props = {
    label:string;
    secondaryLabel: any;
    currency?: boolean;
    suffix?: string
}

const CheckoutItem = ({label,secondaryLabel,currency,suffix}: Props) => {
  return (
    <>
    <div className='col-span-1 flex text-center items-center justify-center w-full break-words'>{label}</div>
    <div className={`transparent flex-grow border-b-4 h-1 border-dotted border-black`}></div>
    <div className='col-span-1 flex items-center justify-center text-center font-main w-full break-all'>{currency ? `₦`:``}{secondaryLabel}{suffix && suffix}</div>
    </>
  )
}

export default CheckoutItem