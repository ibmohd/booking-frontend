"use client"

import {useLocation} from 'react-router-dom'


const Footer = () => {

  const homepage = useLocation().pathname

  if(homepage === '/'){
    return null
  }
  return (
    <div className="w-full h-[20rem] bg-black">

    </div>
  )
}

export default Footer