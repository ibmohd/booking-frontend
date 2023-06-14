import {GoLocation} from 'react-icons/go'
import Button from '../components/Button'


const Homepage = () => {
 
  const companyName = "Top Trims"
  const companyLocation = "Somwhere, Middle Of Nowhere. Lost"

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] relative">
        
        <img
          src={"https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
          width={500}
          height={500}
          alt="Picture of the author"
          className="w-full h-full object-cover"
        />

        <div className={`w-full md:w-1/2 xl:w-1/3 h-full bg-white/80 flex flex-col items-center justify-center absolute left-0 gap-5`}>
          <h3
            className={`${'font-title'} text-5xl mb-5`}>
            {companyName}
          </h3>
          <span className="flex flex-row items-center justify-center gap-3">
            <GoLocation size={20}/>
            <h4
              className="text-xl text-neutral-800">
              {companyLocation}
            </h4>
          </span>
          <Button label="Book Now" redirect="/reserve/professional"/>
        </div>

      </div>
  )
}

export default Homepage