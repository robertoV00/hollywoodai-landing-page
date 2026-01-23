import React from 'react'
import SelectedMovies from './SelectedMovies'
import TopMovies from './TopMovies'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function Dashboard() {
  return (
    <>
    <div className='pl-40 pr-40'>
        <div className='search-box h-[80px] border-b p-5 pl-10'>
            <div className='relative w-[400px]'>
                <input placeholder='Search for movies...' 
                className='bg-gray-200 w-full h-[40px] border-none outline-none rounded-full p-5 pl-12 text-sm' 
                type="text" 
                />
              <MagnifyingGlassIcon height={20} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600'/>
            </div>
        </div>
        <div className='summarizer-container border-b p-8 pt-5 w-full'>
            <h1 className='text-[36px] font-bold'>AI Movie Summarizer</h1>
            <p className='text-gray-600 text-[14px]'>Enjoy high-quality summaries of your favorite movies instantly without breaking a sweat.</p>
        </div>
        <SelectedMovies />
        <TopMovies />
    </div>
    </>
  )
}
