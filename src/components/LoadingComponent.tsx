
const LoadingComponent = () => {
  return (

    // CREDIT TO https://codepen.io/greenmoon1396 FOR THE LOADER
    <div className="flex justify-center items-center h-[50vh]">
        <div className="w-[50px] h-[50px] relative animate-box-loader">
            <span className="w-[50px] h-[50px] absolute left-0 top-0 border-[#0B1B48] border-4"></span>
            <span className="w-[50px] h-[50px] absolute left-0 top-0 border-[#0B1B48] border-4"></span>
            <span className="w-[50px] h-[50px] absolute left-0 top-0 border-[#0B1B48] border-4"></span>
            <span className="w-[50px] h-[50px] absolute left-0 top-0 border-[#0B1B48] border-4"></span>
        </div>
    </div>


    // CREDIT TO https://codepen.io/WebsiteMentor FOR THE LOADER
    // <div className="h-[50svh] grid place-items-center">
    //     <div id='animation-container' className="relative w-[200px] h-[200px] mt-10">
    //         <span className="absolute block w-[40%] h-[40%] rounded-[50%] animate-speed"></span>
    //         <span className="absolute block w-[40%] h-[40%] rounded-[50%] animate-speed"></span>
    //         <span className="absolute block w-[40%] h-[40%] rounded-[50%] animate-speed"></span>
    //         <span className="absolute block w-[40%] h-[40%] rounded-[50%] animate-speed"></span>
    //     </div>
    // </div>
  )
}

export default LoadingComponent