import React from 'react'
import SelectedMovies from './SelectedMovies'
import TopMovies from './TopMovies'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchBox from '@/components/SearchBox'


export default function Dashboard() {
  return (
    <>
    <div className="master-container">
      
        <SearchBox />
      <div className='summarizer-container flex flex-col flex-wrap border-b pb-8 pt-5 2xl:pl-48 pl-10'>
              <h1 className='text-[36px] font-bold'>AI Movie Summarizer</h1>
              <p className='text-gray-600 text-[14px] flex  flex-wrap'>Enjoy high-quality summaries of your favorite movies instantly without breaking a sweat.</p>
      </div>
      <div className=''>
          <SelectedMovies />
          <TopMovies />
      </div>

    </div>
    </>
  )
}
