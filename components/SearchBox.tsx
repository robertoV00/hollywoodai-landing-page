import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'


export default function SearchBox() {
  return (
     <div className='h-[80px] search-box-container border-b pl-48 relative'>
            <div className='relative w-[400px] top-5'>
                <input placeholder='Search for movies...' 
                className='bg-gray-200 w-full h-[40px] border-none outline-none rounded-full p-5 pl-12 text-sm' 
                type="text" 
                />
              <MagnifyingGlassIcon height={20} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600'/>
            </div>
    </div>
  )
}
