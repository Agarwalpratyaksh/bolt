import { Link } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
        
    <div>
        NavBar
    </div>
    <div className='border bg-red-100 border-black p-4'>
        <input type="text" />
        <div>
            <Link/>
        </div>
    </div>

    </div>
  )
}

export default Hero