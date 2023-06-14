import { ChangeEvent, useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {IoMdPerson} from 'react-icons/io'
import {MdRoomService} from 'react-icons/md'
import {BsClock} from 'react-icons/bs'
import PaymentToggle from '../components/PaymentToggle'
import CheckoutItem from '../components/CheckoutItem'
import TipSection from '../components/TipSection'
import { Customer, Professional, Service } from '../types'


const ReservationPage = () => {

  const {professional,services,date,time} = useParams()
  const navigate = useNavigate()
  const tax_percentage = (13/100)

  const validProfessional = professional && decodeURIComponent(professional)
  const validDate = date && decodeURIComponent(date)
  const validTime = time && decodeURIComponent(time)
  const validServices = services?.split(',').filter(str => str.length>1 && decodeURIComponent(str))

  const [tipAmount, setTipAmount] = useState<number>(0)
  const [orderTotal, setOrderTotal] = useState<number>(0)
  const [serviceTotal, setServiceTotal] = useState<number>(0)
  const [orderTax, setOrderTax] = useState<number>(0)
  const [toggle, setToggle] = useState(false)

  const appointmentDate = validDate && new Date(validDate).toISOString().split("T")[0];

  const [appointmentData, setAppointmentData] = useState<{professional:Professional, services: Service[]}>()
  const [customerDetails, setCustomerDetails] = useState<Customer>({
    customer_email: '',
    customer_name: '',
    customer_phone:''
  })
  const professional_name = appointmentData?.professional.firstname
  const appointment_services = appointmentData?.services

  useEffect(()=>{

    const calculateServiceTotal = () => {
      const value = appointment_services ? appointment_services?.reduce((accumulator,currentValue) => accumulator + currentValue.price,0):0
      setServiceTotal(value)
      return value
    }
    const calculateSubTotal = () => {
      const value = calculateServiceTotal() + tipAmount
      return value
    }
    const calculateTax = () => {
      const value = calculateServiceTotal() * tax_percentage // or whatever tax amount 
      setOrderTax(value)
      return value
    } 
    const calculateTotal = ()=>{
      const service_total = calculateSubTotal()
      const tax = calculateTax()
      setOrderTotal(service_total + tax)
    }

    calculateTotal()

  },[tipAmount,appointment_services,tax_percentage])

  useEffect(()=>{
    const getAppointmentData = async () => {
      const data = await fetch("https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/appointments/get-info",{
          method:"POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
              employee_id: professional && decodeURIComponent(professional),
              services: services?.split(',').filter(str => str.length>1 && decodeURIComponent(str)),
          })
        })
        .then(async (res) => {
          if(!res.ok){
            throw new Error("Failed to fetch data")
          }
          const d = await res.json()
          return d
        })
        setAppointmentData(data)
    }

    getAppointmentData()

  },[professional,services])

  const setTip = (value: number) => {
    setTipAmount(value)
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value.trim(),
    })
  }

  const handleReservation = async () => {
    const payload = {
      ...customerDetails,
      employee_id: validProfessional,
      services: validServices,
      appointment_date: validDate,
      start_time: validTime,
      tip_amount:tipAmount,
      tax_amount:orderTax,
      total_amount:orderTotal
    }
    await fetch("https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/appointments/reserve",{
      method:"POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(payload)
    })
    .then( async (res) => {
      if(res.ok) {
        const url = await res.json()
        navigate(url)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handlePayment = async () => {

    const payload = {
      ...customerDetails,
      employee_id: validProfessional,
      services: validServices,
      appointment_date: validDate,
      start_time: validTime,
      tip_amount: tipAmount,
      tax_amount:orderTax,
      total_amount:orderTotal
    }

    try{

      await fetch("https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/appointments/pay-and-reserve",{
        method:"POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(payload)
      })
      .then( async (res) => {
        if(res.ok) {
          const data = await res.json()
          const url = data.data.authorization_url
          window.location.href = url
        }
      })
    }catch(err){
      console.log(err)
    }

  }

  return (
    <div className="w-[100vw] min-h-[100vh] px-5 flex flex-col lg:flex-row justify-center gap-5 mt-10 lg:mt-20">
        
        <div className='bg-white w-full lg:w-1/2 flex flex-col h-full items-center'>
          
          {/* Customer Details */}
          <div className={`mb-5 bg-white border-black border-2 w-full h-full lg:h-[70%] flex flex-col items-center`}>
              <h3 className={`${'font-marker'} text-black text-2xl underline underline-offset-4 my-5`}>
                  {"Your Contact Information"}
              </h3>
              <div className='w-full my-5 flex flex-col justify-around items-center'>
                <div className='w-full flex flex-col items-center'>
                  <div className="mb-4 w-4/5">
                    <label className="block text-gray-700 text-sm font-bold mb-2 font-marker">Contact Name<span className="text-red-500">*</span></label>
                    <input onChange={handleChange} className="shadow appearance-none border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="customer_name" type="text"/>
                  </div>
                  <div className="mb-4 w-4/5">
                    <label className="block text-gray-700 text-sm font-bold mb-2 font-marker">Contact Email<span className="text-red-500">*</span></label>
                    <input onChange={handleChange} className="shadow appearance-none border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="customer_email" type="email"/>
                  </div>
                  <div className="mb-4 w-4/5">
                    <label className="block text-gray-700 text-sm font-bold mb-2 font-marker">Contact Phonenumber<span className="text-red-500">*</span></label>
                    <input onChange={handleChange} className="shadow appearance-none border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="customer_phone" type="text"/>
                  </div>
                </div>
              </div>
          </div>

          {/* Reservation Details */}
          <div className={` bg-white border-black border-2 w-full h-full lg:h-[70%] flex flex-col items-center mb-10`}>
              <h3 className={`${'font-marker'} text-black text-2xl underline underline-offset-4 my-5`}>
                  {"Your Reservation Details"}
              </h3>
              <div className={`${'font-marker'} flex flex-col w-full h-full justify-evenly items-center px-10 gap-5`}>
                  <div className="w-full h-auto flex flex-row items-center gap-10">
                      <div className='flex flex-col-reverse items-center justify-center'>
                          Professional
                          <IoMdPerson size={50} color='black'/>
                      </div>
                      <div className='text-black text-2xl text-center'>{professional_name}</div>
                  </div>
                  <div className="h-auto w-full flex flex-row items-center gap-10">
                      <div className='flex flex-col-reverse items-center justify-center'>
                          Services
                          <MdRoomService size={50} color='black'/>
                      </div>
                      <div className='w-full grid grid-cols-2 gap-2'>
                      {appointment_services?.map((service,index) => (
                          <div key={index} className={`text-center justify-center items-center flex col-span-1 bg-black text-white overflow-hidden`}>{service.title}</div>
                      ))}
                      </div>

                  </div>
                  <div className="h-auto w-full flex flex-row items-center gap-10 mb-10">
                      <div className='flex flex-col-reverse items-center justify-center'>
                          Time
                          <BsClock size={50} color='black'/>
                      </div>
                      <div className='text-black font-main text-xl lg:text-2xl text-center'>{`${appointmentDate && new Date(appointmentDate.split("T")[0].concat("T12:00:00.000Z")).toDateString()} @ ${validTime?.slice(0,5)}`}</div>
                  </div>
              </div>
          </div>

        </div>

        <div className={`${'font-marker'}  text-black w-full lg:w-[50%] h-full lg:h-[70%] flex flex-col items-center bg-white`}>
            <h3 className={` text-2xl underline underline-offset-4 my-5`}>
                {"Your Order Summary"}
            </h3>
            <div className='w-full grid grid-cols-3 gap-5 text-2xl items-center'>
              {appointment_services?.map((item,index) => (
                <CheckoutItem key={index} label={item.title} secondaryLabel={item.price} currency/>
              ))}   
              <CheckoutItem label='Tip' secondaryLabel={tipAmount} currency/>
              <TipSection setTipAmount={setTip} serviceTotal={serviceTotal}/>    
              <CheckoutItem label='Sub Total' secondaryLabel={serviceTotal + tipAmount} currency/> 
              <CheckoutItem label='Taxes' secondaryLabel={orderTax} currency/> 
            </div>
            <div className='w-full mt-10 justify-self-start grid grid-cols-3 text-2xl items-center'>
                <CheckoutItem label='Order Total' secondaryLabel={orderTotal} currency/>
            </div>
            <PaymentToggle toggle={toggle} setToggle={setToggle}/>
            
            <button
            onClick={toggle ? handleReservation:handlePayment}
            className='w-[80%] h-14 bg-black my-10 rounded-xl text-center text-white text-xl tracking-widest'>
                {toggle ? "Reserve":"Reserve & Pay"}
            </button>
        </div>

    </div>
  )
}

export default ReservationPage