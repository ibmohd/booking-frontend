import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { OrderDetails } from '../types'
import CheckoutItem from '../components/CheckoutItem'



const OrderReceiptPage = () => {

    const [receiptDetails, setReceiptDetails] = useState<OrderDetails>()
    const {appointment_id} = useParams()
    const date = receiptDetails && new Date(new Date(receiptDetails.appointment_date).toLocaleDateString('en-US', {timeZone: 'UTC'})).toDateString();

    useEffect(()=>{
        const getReceiptDetails = async () => {
        const data = await fetch(`https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/appointments/reserved-appointments/${appointment_id}`)
        .then(async (res) => {
            if(!res.ok){
            throw new Error("Failed to fetch data")
            }
            const d = await res.json()
            return d
        })
        setReceiptDetails(data)
        }

        getReceiptDetails()

    },[appointment_id])


  return (
    <div className="min-h-[100svh] flex flex-col items-center">

        <h2 className='text-4xl font-main bg-gray-100 p-5 rounded-xl text-center'>Your reservation details</h2>

        <div
            className={`
            ${receiptDetails?.payment_confirmed ? 'bg-green-500 text-white' : 'border-red-600 border-dotted border-4 text-red-600 '}
            px-24 py-10 text-center font-title text-lg font-semibold rounded-md my-10 text-[3rem] tracking-widest
            `}
        >
        {receiptDetails?.payment_confirmed ? 'PAID' : 'UNPAID'}
      </div>
        
        <div className="w-full flex flex-col lg:flex-row justify-around items-center gap-2 px-14 lg:px-40">
            <div className="flex flex-col items-center bg-gray-100 py-5 rounded-xl px-10">
                <img src={receiptDetails?.employee_image} 
                     alt={`employee-image`}
                     className='w-32 h-32 rounded-full object-cover'/>
                <div className="text-xl flex flex-col items-center justify-center gap-3 mt-3 px-3 font-marker">
                    <p className="text-gray-600 underline-offset-4 underline">Your Professional</p>
                    <div className="text-gray-600 gap-3 flex">
                        <p>{receiptDetails?.employee_firstname}</p>
                        <p>{receiptDetails?.employee_lastname}</p>
                    </div>
                </div>
            </div>
           
            <div className="bg-gray-100 py-5 rounded-xl px-10 flex flex-col items-center mt-10 justify-center relative">
                <p className="text-gray-600 underline-offset-4 underline text-2xl font-marker text-center">Your Scheduled Date & Services</p>
                <p className='text-xl font-main mt-5 text-gray-600 font-bold'>{`${date} @ ${receiptDetails?.start_time.slice(0,5)}`}</p>
                <div className='w-full grid grid-cols-2 gap-2 pt-10'>
                    {receiptDetails?.services?.map((service,index) => (
                        <div key={index} className={`text-center justify-center items-center px-3 py-1 font-marker flex col-span-1 bg-black text-white overflow-hidden`}>{service}</div>
                    ))}
                </div>
                {receiptDetails?.cancelled && <div className="absolute top-5 left-[-6rem] transform translate-x-1/2 -translate-y-1/2">
                    <div className="bg-red-500 text-white font-bold py-2 px-5 uppercase text-xs transform -rotate-45">
                    Cancelled
                    </div>
                </div>}
            </div>
        </div>

        <div className="my-5 w-full flex flex-col lg:flex-row items-center px-14 lg:px-40">
            <div className="w-full lg:w-1/2 py-5 border-b-[1px] lg:border-r-[1px] lg:border-b-[0px] items-center grid grid-cols-3 gap-5 font-marker text-lg p-2 lg:p-5">
                <CheckoutItem label='Client Name' secondaryLabel={receiptDetails?.customer_name}/> 
                <CheckoutItem label='Contact Email' secondaryLabel={receiptDetails?.customer_email}/> 
                <CheckoutItem label='Contact Phonenumber' secondaryLabel={receiptDetails?.customer_phone}/> 
            </div>
            <div className="w-full lg:w-1/2 py-5 border-t-[1px] lg:border-l-[1px] lg:border-t-[0px] items-center grid grid-cols-3 gap-5 font-marker text-lg p-2 lg:p-5">
                <CheckoutItem label='Total Service Time' secondaryLabel={receiptDetails?.total_duration} suffix={'mins'}/>
                <CheckoutItem label='Service Cost' secondaryLabel={receiptDetails?.service_total} currency/> 
                <CheckoutItem label='Tip' secondaryLabel={receiptDetails?.tip_amount} currency/> 
                <CheckoutItem label='Tax' secondaryLabel={receiptDetails?.tax_amount} currency/> 
                <CheckoutItem label='Total' secondaryLabel={receiptDetails?.total_amount} currency/> 
            </div>
        </div>

    </div>
  )
}

export default OrderReceiptPage