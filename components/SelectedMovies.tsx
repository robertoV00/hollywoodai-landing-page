'use client'

import React, { useEffect, useState, useRef } from 'react'
import BlazeSlider from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface Movie {
  id: string
  title: string
  director: string
  imageLink: string
  rating: string
  subscriptionRequired: boolean

}

export default function SelectedMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user)
  const isSubscribed = user?.isSubscribed || false

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const sliderInstance = useRef<any>(null)

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
        loop: false,
      },
      '(max-width: 1300px)' : {
        slidesToShow: 5
      },
      '(max-width: 1200px)' : {
        slidesToShow: 4
      },
      '(max-width: 980px)' : {
        slidesToShow: 3
      },
      '(max-width: 600px)' : {
        slidesToShow: 2
      }

    })
  }, [movies])

  if (loading) {
    return (
      <div className=" p-8">
        <h1 className='font-bold text-[26px] mb-2'>Selected just for you</h1>
        <h4 className='text-gray-500 mb-6'>We think you'll like these.</h4>
        <div className='flex gap-4 overflow-x-auto pb-4'>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='flex-shrink-0 w-[160px]'>
              <Skeleton height={250} className='rounded-lg mb-4' />
              <Skeleton width='100%' height={20} className='mb-2' />
              <Skeleton width='80%' height={14} className='mb-2' />
              <Skeleton width='60%' height={16} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="selected-movies-master-container p-8 pt-5 w-[100%] 2xl:pl-48 2xl:pr-48 md:pl-10 md:pr-10 sm:pl-10 sm:pr-10">
        <h1 className='font-bold text-[26px] mb-2'>Selected just for you</h1>
        <h4 className='text-gray-500 mb-6'>We think you'll like these.</h4>

        <div className="blaze-slider" ref={sliderRef}>
        <div className="blaze-container">
        <div className="blaze-track-container">
          <div className="blaze-track">
          {movies.map((movie) => (
            <div key={movie.id} className='w-[160px] relative cursor-pointer' onClick={() => router.push(`/summary/${movie.id}`)}>
              {/* Premium pill */}
              {!isSubscribed && movie.subscriptionRequired && (
                <div className='absolute -top-0 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-10 overflow-visible'>
                  Premium
                </div>
              )}

              <div className='relative w-full h-[250px] group cursor-pointer rounded-lg overflow-hidden'>
                <Image
                  src={movie.imageLink}
                  alt={movie.title}
                  fill
                  className='object-cover'
                />
                
                {/* Hover overlay */}
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100'>
                  <h3 className='text-white font-bold mb-1'>{movie.title}</h3>
                  <p className='text-gray-300 text-xs mb-2'>{movie.director}</p>
                  <div className='flex items-center gap-1'>
                    <span className='text-yellow-400'>⭐</span>
                    <span className='text-white text-sm font-semibold'>{movie.rating}</span>
                  </div>
                </div>
              </div>

              <div className='mt-2'>
                <h3 className='text-black text-sm font-bold break-words'>{movie.title}</h3>
                <p className='text-gray-500 text-xs mb-1 break-words'>{movie.director}</p>
                <div className='flex items-center gap-1'>
                  <span className='text-gray-500'>
                    <ClockIcon className='h-4'/>
                  </span>
                  <span className='text-gray-500'>
                    <StarIcon className='h-4'/>
                  </span>
                  <span className='text-gray-500 text-xs font-semibold'>{movie.rating}</span>
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