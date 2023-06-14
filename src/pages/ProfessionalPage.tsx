import { useEffect, useState } from "react"
import { Professional } from "../types"
import ProfessionalCard from "../components/ProfessionalCard"
import LoadingComponent from "../components/LoadingComponent"



const ProfessionalPage = () => {

  const [professionals, setProfessionals] = useState<Professional[]>([])

  useEffect(()=>{
    const getProfessionals = async () => {
      const data = await fetch("https://7aqtejf5cw22lszlbaglxvemxu0ejfhg.lambda-url.us-east-2.on.aws/employees/all")
      .then(async (res) => {
        if(!res.ok){
          throw new Error("Failed to fetch data")
        }
        const d = await res.json()
        return d
      })
      setProfessionals(data.employees)
    }

    getProfessionals()

  },[])

  //LOADING CONDITION
  if(professionals.length <= 0){
    return (
      <LoadingComponent/>
    )
  }


  return (
    <div className='min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 lg:mt-20 gap-8 px-10 sm:px-12 md:px-15 lg:px-20'>
        
      {professionals?.map((professional,index) => (
          <div key={index}>
            <ProfessionalCard professional={professional}/>
          </div>
      ))
    }


    </div>
  )
}

export default ProfessionalPage