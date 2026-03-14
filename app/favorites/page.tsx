'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect, useRef, useState } from 'react'
import BlazeSlider from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'
import Image from 'next/image'
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { setFavorites } from '@/redux/slices/favoritesSlice'
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import LoginModal from '@/components/modals/LoginModal'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


interface Movie {
  id: string
  title: string
  director: string
  imageLink: string
  rating: string
  subscriptionRequired: boolean
}

export default function Favorites() {
  const [loading, setLoading] = useState(false)
  const [slidesToShow, setSlidesToShow] = useState(7)
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const movies = useSelector((state: RootState) => state.favorites.movies)
  const isSubscribed = user?.isSubscribed || false
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const sliderInstance = useRef<any>(null)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites')
      if (savedFavorites) {
        dispatch(setFavorites(JSON.parse(savedFavorites)))
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }, [dispatch])


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

  if (movies.length === 0) {
    return (
      <div className='flex'>
        <Sidebar />
        <div className='w-full p-8'>
          <h1 className='font-bold text-[26px] mb-2'>Your Favorites</h1>
          <p className='text-gray-500 mb-6'>You haven't added any favorites yet. Start by adding movies from the summary page!</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* <LoginModal /> */}
      <div className='flex'>
        <Sidebar />
        <div className='w-full page-container'>
        <SearchBox />
          <div className='pt-20 2xl:pl-40 2xl:pr-40 pl-10 pr-10 entire-container'>
            <h1 className='font-bold text-[26px] mb-2'>Saved Movies</h1>
            
            {loading ? (
              <>
                <h3 className='text-gray-400 mb-6 border-gray-200 border-b-2 pb-6 text-[20px]'><Skeleton width={200} /></h3>
                <div className='flex gap-4 overflow-x-auto pb-4'>
                  {Array.from({ length: slidesToShow }).map((_, index) => (
                    <div key={index} className='flex-shrink-0 w-[160px]'>
                      <Skeleton height={260} className='rounded-lg mb-4' />
                      <Skeleton width='100%' height={20} className='mb-2' />
                      <Skeleton width='80%' height={14} className='mb-2' />
                      <Skeleton width='60%' height={16} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
              <h3 className='text-gray-400 mb-6 border-gray-200 border-b-2 pb-6 text-[20px]'>{movies.length} {movies.length === 1 ? 'Movie' : 'Movies'}</h3>

              <div className="blaze-slider" ref={sliderRef}>
                <div className="blaze-container">
                  <div className="blaze-track-container">
                    <div className="blaze-track">
                      {movies.map((movie) => (
                        <div key={movie.id} className='movie-card w-[160px] relative cursor-pointer' onClick={() => router.push(`/summary/${movie.id}`)}>
                          {/* Premium pill */}
                          {movie.subscriptionRequired && user?.subscriptionType === 'basic' && (
                            <div className='absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-700/70 to-purple-800/70 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold z-10 overflow-visible shadow-lg'>
                              Premium
                            </div>
                          )}

                          <div className='relative h-[250px] group cursor-pointer rounded-lg overflow-hidden'>
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
            </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
