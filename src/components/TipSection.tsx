
// import { Abril_Fatface } from "next/font/google"
// const font = Abril_Fatface({weight:"400", subsets: ['latin'] })

import { useState } from "react"


type Props = {
    setTipAmount: (value:number) => void
    serviceTotal: number
}

const TipSection = ({setTipAmount,serviceTotal}: Props) => {
  
  const percentages = [10,15,20,50]

  const [customTip, setCustomTip] = useState<boolean>(false)

  return (
    <>
        <div className={`col-span-3 w-full h-[5rem] flex flex-row items-center justify-evenly text-lg lg:px-10 ${''}`}>
            {percentages.map((percentage,index) => (
                <div 
                key={index}
                onClick={() => {
                    setCustomTip(false)
                    setTipAmount(serviceTotal*(percentage/100))
                }}
                className={`${`hover:bg-green-600`} bg-black text-white border-white border-2 flex items-center justify-center text-center w-full py-3 rounded-lg cursor-pointer`}>
                    {`${percentage}%`}
                </div>
            ))}
            <div 
            onClick={() => setCustomTip(!customTip)}
            className={`
                ${customTip ? `hidden` : `bg-black text-white`}
                border-white border-2 flex items-center justify-center text-center w-full py-3 rounded-lg cursor-pointer`}>
                {"Custom"}
            </div>
            <input
            type="number"
            placeholder="Amount"
            onChange={(e) => {
                e.preventDefault()
                if(typeof parseInt(e.target.value) === 'number' && !isNaN(parseInt(e.target.value))){
                    setTipAmount(parseInt(e.target.value))
                }else{
                    setTipAmount(0)
                }
                
            }}
            className={`${customTip ? ``:`hidden`} w-full py-3 rounded-lg border-black border-2 flex items-center justify-center text-center`}
            />
        </div>
        
    </>
  )
}

export default TipSection