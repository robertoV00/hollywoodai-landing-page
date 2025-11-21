'use client'

import React, { useEffect, useState, useRef } from 'react'
import BlazeSlider from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'
import Image from 'next/image'
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline'

interface Movie {
  id: string
  title: string
  director: string
  imageLink: string
  rating: string
}

export default function TopMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const sliderInstance = useRef<any>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://advanced-internship-api-production.up.railway.app/topMovies')
        const data = await response.json()
        setMovies(data.data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  useEffect(() => {
    if (!sliderRef.current || movies.length === 0) return

    // destroy previous instance
    if (sliderInstance.current) {
      sliderInstance.current.destroy()
    }

    sliderInstance.current = new BlazeSlider(sliderRef.current, {
      all: {
        slidesToShow: 7,
        slideGap: '16px',
        transitionDuration: 500,
        loop: false
      }
    })

    return () => {
      sliderInstance.current?.destroy()
    }
  }, [movies])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className='font-bold text-[26px] mb-2'>Top Movies</h1>
      <h4 className='text-gray-500 mb-6'>Enjoy our highest rated films.</h4>

      <div className='blaze-slider' ref={sliderRef}>
        <div className='blaze-container w-full'>
          <div className='blaze-track-container'>
            <div className='blaze-track flex gap-4'>

              {movies.map((movie) => (
                <div key={movie.id} className='flex-shrink-0 w-[160px]'>
                  <div className='relative w-full h-[350px] group cursor-pointer rounded-lg overflow-hidden'>
                    <Image
                      src={movie.imageLink}
                      alt={movie.title}
                      fill
                      className='object-cover'
                    />

                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100'>
                      <h3 className='text-white text-sm font-bold mb-1 line-clamp-2'>{movie.title}</h3>
                      <p className='text-gray-300 text-xs mb-2'>{movie.director}</p>
                      <div className='flex items-center gap-1'>
                        <span className='text-yellow-400'>⭐</span>
                        <span className='text-white text-sm font-semibold'>{movie.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className='mt-2'>
                    <h3 className='text-black text-[17px] font-bold'>{movie.title}</h3>
                    <p className='text-gray-500 text-xs mb-1'>{movie.director}</p>

                    <div className='flex items-center gap-1'>
                      <ClockIcon className='h-4 text-gray-500' />
                      <StarIcon className='h-4 text-gray-500' />
                      <span className='text-gray-500 text-sm font-semibold'>
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
