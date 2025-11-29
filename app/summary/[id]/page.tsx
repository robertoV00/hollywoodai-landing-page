import Sidebar from '@/components/Sidebar'
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline'
import { BoltIcon, BookmarkIcon, CalendarDateRangeIcon, MicrophoneIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Image from 'next/image'

export default async function Page({ params }: { params: { id: string } }) {
    const movieId = params.id
    
    // Fetch movie data using movieId
    const response = await fetch(`https://advanced-internship-api-production.up.railway.app/selectedMovies`)
    const data = await response.json()
    const movie = data.data.find((m: any) => m.id === movieId)

    if (!movie) {
        return <div>Movie not found</div>
    }
  
    return (
    <>
        <div className='flex'>
            <Sidebar />
            <div className='w-full'>
                <div className='border-b p-8'>
                    <input placeholder='Search for movies...' 
                    className='bg-gray-200 w-[400px] h-[40px] border-none rounded-full p-5 text-sm' 
                    type="text" 
                    />
                </div>

                <div className='p-14 pl-40 pr-40 flex gap-8'>
                    <div className='flex-1'>
                        <div className='border-b-2'>
                            <h1 className='text-4xl font-bold mb-2'>{movie.title}</h1>
                            <p className='text-gray-500 mb-6'>{movie.director}</p>
                        </div>

                        <div className='flex gap-5 mb-8 border-b-2 flex-col pt-8 pb-8'>
                            <div className='flex items-center gap-2'>
                                <StarIcon className='h-5 w-5'/>
                                <span className='text-sm'>{movie.rating} / 10</span>
                                <ClockIcon className='h-5 w-5'/>
                                <span className='text-sm'>10:00</span>
                            </div>
                            
                            <div className='flex items-center gap-2'>
                                <MicrophoneIcon className='h-5 w-5'/>
                                <span className='text-sm'>Audio & text</span>
                                <CalendarDateRangeIcon className='h-5 w-5'/>
                                <span className='text-sm'>2009</span>
                            </div>
                        </div>

                        <div className='flex gap-4 mb-8 flex-col'>
                            <button className='bg-purple-950 text-white px-8 py-2 rounded-md font-semibold flex items-center gap-2 justify-center h-[60px] w-[300px]'>
                                Summarise <BoltIcon height={20}/>
                            </button>
                            <button className='text-blue-500 font-semibold flex items-center mt-2 mb-4 ml-0'>
                                <BookmarkIcon height={30} className='pr-3'/> Remove from Favourites
                            </button>
                        </div>

                        <div>
                            <h2 className='text-xl font-bold mb-4'>What's it about?</h2>
                            <div className='flex gap-2 mb-4'>
                                <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Action</span>
                                <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Adventure</span>
                            </div>
                            <p className='text-gray-700 text-sm leading-relaxed'>
                                Movie description here
                            </p>
                        </div>
                    </div>

                    <div className='flex-shrink-0'>
                        <div className='w-64 h-80 bg-gray-200 rounded-lg overflow-hidden'>
                            <Image 
                            src={movie.imageLink}
                            alt={movie.title}
                            width={256}
                            height={384}
                            className='w-full h-full object-cover'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}