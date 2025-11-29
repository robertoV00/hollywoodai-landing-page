'use client'

import React, { useEffect, useState } from 'react'
import BlazeSlider from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'
import Image from 'next/image'
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface Movie {
  id: string
  title: string
  director: string
  imageLink: string
  rating: string
}

export default function SelectedMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [slidesToShow, setSlidesToShow] = useState(7)
  const router = useRouter()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://advanced-internship-api-production.up.railway.app/selectedMovies')
        const data = await response.json()
        setMovies(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(2)
      } else if (window.innerWidth < 768) {
        setSlidesToShow(3)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(4)
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(5)
      } else {
        setSlidesToShow(7)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (movies.length > 0) {
      const el = document.querySelector('.blaze-slider')
      if (el) {
        new BlazeSlider(el, {
            all: {
                slidesToShow: slidesToShow,
                slideGap: "16px",
                transitionDuration: 500,
                loop: false,      
            }
        })
      }
    }
  }, [movies, slidesToShow])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <>
      <div className="p-8">
        <h1 className='font-bold text-[26px] mb-2'>Selected just for you</h1>
        <h4 className='text-gray-500 mb-6'>We think you'll like these.</h4>

        <div className='blaze-slider'>
          <div className='blaze-container w-full'>
            <div className='blaze-track-container h-[350px]'>
              <div className='blaze-track relative flex gap-4 h-[450px]'>
                {movies.map((movie) => (

                  <div key={movie.id} className='flex-shrink-0 w-[160px] h-[250px]' onClick={() => router.push(`/summary/${movie.id}`)}>


                        <div className='relative w-full h-full group cursor-pointer rounded-lg overflow-hidden'>
                        
                        <Image
                            src={movie.imageLink}
                            alt={movie.title}
                            fill
                            className='object-cover'
                        />
                        
                        {/* Hover overlay */}
                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100'>
                            <h3 className='text-white text-sm font-bold mb-1 line-clamp-2'>{movie.title}</h3>
                            <p className='text-gray-300 text-xs mb-2'>{movie.director}</p>
                            <div className='flex items-center gap-1'>
                            <span className='text-yellow-400'>⭐</span>
                            <span className='text-white text-sm font-semibold'>{movie.rating}</span>
                            </div>
                            
                        </div>


                        </div>
                        <div className='relative inset-0 bg-black bg-opacity-0 transition-all duration-300 flex flex-col justify-end p-3'>
                            <h3 className='text-black text-sm text-[17px] font-bold mb-1 line-clamp-2'>{movie.title}</h3>
                            <p className='text-gray-500 text-xs mb-2'>{movie.director}</p>
                            <div className='flex items-center gap-1'>
                            <span className='text-gray-500'>
                                <ClockIcon className='h-4'/>
                            </span>
                            <span className='text-gray-500'>
                                <StarIcon className='h-4'/>
                            </span>
                            <span className='text-gray-500 text-sm font-semibold'>{movie.rating}</span>
                            </div>
                        </div>
                    </div>

                  
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}