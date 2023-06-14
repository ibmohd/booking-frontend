import {useState,useEffect} from 'react'

import { useSearchParams, useNavigate } from 'react-router-dom';
import success from '../assets/paymentsuccess.gif'

const OrderSuccessPage = () => {

  const [loading, setLoading] = useState(true)
  const [reference] = useSearchParams()
  const navigate = useNavigate();
  const ref = reference.get('reference')
  
  
  useEffect(() => {
    const verify = async () => {
      try{
        const id = await fetch(`https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/appointments/verify-payment/${ref}`)
        .then(async (res) => {
            if(!res.ok){
            throw new Error("Failed to fetch data")
            }
            const d = await res.json()
            return d
        })
        navigate(`/reserved-appointments/${id}`)
      }catch(error){
        console.log(error)
      }
    }

    if(loading){
      verify()
      setLoading(!loading)
    }
  },[loading,navigate,ref])
  
  return (
    <div className=' h-[100vh] w-full text-center flex flex-col justify-center items-center text-2xl text-black bg-white'>
        <img src={success} alt='empty cart' className='w-[20rem] h-[20rem] bg-inherit mb-10'/>
        THANK YOU FOR YOUR PATRONAGE!! :) 
        WAIT TO BE REDIRECTED
        OR CLICK
        <p className='w-full text-cyan-700 underline hover:text-cyan-500 cursor-pointer'
        onClick={()=> setLoading(true)}
        >
        HERE
        </p>
    </div>
  )
}
 
export default OrderSuccessPage