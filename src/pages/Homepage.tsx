import { GoLocation } from 'react-icons/go';
import Button from '../components/Button';

const Homepage = () => {
  const companyName = "Top Trims";
  const companyLocation = "You Know The Spot";
  const hoursOfOperation = [
    { day: "Monday", hours: "7am-9pm" },
    { day: "Tuesday", hours: "7am-9pm" },
    { day: "Wednesday", hours: "7am-9pm" },
    { day: "Thursday", hours: "7am-9pm" },
    { day: "Friday", hours: "7am-9pm" },
  ];

  return (
    <div className="flex items-center justify-center w-screen h-screen relative">
      <img
        src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        width={500}
        height={500}
        alt="Picture of the author"
        className="w-full h-full object-cover"
      />
      <div className="w-full md:w-1/2 xl:w-1/3 h-full bg-white/80 flex flex-col items-center justify-center absolute left-0 gap-5">
        <h3 className="font-title text-5xl mb-5">{companyName}</h3>
        <span className="flex flex-row items-center justify-center gap-3">
          <GoLocation size={20} />
          <h4 className="text-xl text-neutral-800">{companyLocation}</h4>
        </span>
        <Button label="Book Now" redirect="/reserve/professional" />
        <div className="grid grid-cols-2 gap-2 text-neutral-800 mt-10">
          {hoursOfOperation.map((item) => (
            <div key={item.day} className='col-span-2 grid grid-cols-2 gap-10'>
              <p className="font-semibold col-span-1">{item.day}</p>
              <p className='col-span-1'>{item.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
