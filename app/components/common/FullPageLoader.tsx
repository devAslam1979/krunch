import React from 'react'
import { Loader2 } from "lucide-react";

const FullPageLoader = () => {
  return (
    <div className='w-full bg-gray-400 fixed top-0 left-0  bg-opacity-20 transition-opacity h-full flex justify-center items-center z-[999999]'>
      <Loader2 className="animate-spin text-[#f92c2c]" />
    </div>
  )
}

export default FullPageLoader