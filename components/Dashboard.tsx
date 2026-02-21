import React from 'react'
import SelectedMovies from './SelectedMovies'
import TopMovies from './TopMovies'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchBox from '@/components/SearchBox'


export default function Dashboard() {
  return (
    <>
    <div className="master-container">
      <div className="">
        <SearchBox />
      </div>
      <div className='summarizer-container border-b p-8 pt-5 w-[100%] 2xl:pl-48 2xl:pr-48 md:pl-10 md:pr-10 sm:pl-10'>
              <h1 className='text-[36px] font-bold'>AI Movie Summarizer</h1>
              <p className='text-gray-600 text-[14px] flex wrap'>Enjoy high-quality summaries of your favorite movies instantly without breaking a sweat.</p>
      </div>
      <div className=''>
          <SelectedMovies />
          <TopMovies />
      </div>

    </div>
    </>
  )
}
