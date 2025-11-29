import Sidebar from '@/components/Sidebar'
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline'
import { BoltIcon, BookmarkIcon, CalendarDateRangeIcon, MicrophoneIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Image from 'next/image'

export default function page({ params }: { params: { id: string } }) {
    const movieId = params.id
    // use movieId to fetch movie data
  
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
                            <h1 className='text-4xl font-bold mb-2'>Avatar</h1>
                            <p className='text-gray-500 mb-6'>James Cameron</p>
                        </div>

                        <div className='flex gap-5 mb-8 border-b-2 flex-col pt-8 pb-8'>
                            <div className='flex items-center gap-2'>
                                <StarIcon className='h-5 w-5'/>
                                <span className='text-sm'>7.9 / 10</span>
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
                                <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Fantasy</span>
                                <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Sci-Fi</span>
                            </div>
                            <p className='text-gray-700 text-sm leading-relaxed'>
                                When his brother is killed in a robbery, paraplegic Marine Jake Sully decides to take his place in a mission on the distant world of Pandora. There he learns of greedy corporate figurehead Parker Selfridge's intentions of driving off the native humanoid "Na'vi" in order to mine for the precious material scattered throughout their rich woodland. In exchange for the spinal surgery that will fix his legs, Jake gathers knowledge of the Indigenous Race and their Culture, for the cooperating military unit spearheaded by gung-ho Colonel Quaritch, while simultaneously attempting to infiltrate the Na'vi people with the use of an "avatar" identity. While Jake begins to bond with the native tribe and quickly falls in love with the beautiful alien Neytiri, the restless Colonel moves forward with his ruthless extermination tactics, forcing the soldier to take a stand - and fight back in an epic battle for the fate of Pandora.—The Massie Twins
                            </p>
                        </div>
                    </div>

                    <div className='flex-shrink-0'>
                        <div className='w-64 h-80 bg-gray-200 rounded-lg overflow-hidden'>
                            <Image 
                            src="/assets/avatar.jpg"
                            alt="Avatar"
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