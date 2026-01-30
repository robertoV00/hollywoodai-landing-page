'use client'

import React, { useEffect, useState } from 'react'
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
        // Destroy existing slider if it exists
        const existingSlider = (el as any).blazeSlider
        if (existingSlider) {
          existingSlider.destroy()
        }
        
        // Create new slider
        const slider = new BlazeSlider(el, {
            all: {
                slidesToShow: slidesToShow,
                slideGap: "16px",
                transitionDuration: 500,
                loop: false,      
            }
        })
        ;(el as any).blazeSlider = slider
      }
    }
  }, [movies, slidesToShow])

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
          <div className='p-20 pl-40 pr-40 entire-container'>
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
                <h3 className='text-gray-400 mb-6 border-gray-200 border-b-2 pb-6 text-[20px] '>{movies.length} {movies.length === 1 ? 'Movie' : 'Movies'}</h3>

                <div className="slider-row">
                  <div className='blaze-slider w-full'>
                    <div className='blaze-container w-full'>
                      <div className='blaze-track-container h-[360px] relative top-4'>
                        <div className='blaze-track relative h-[470px]' style={{ width: `${movies.length * 160 + (movies.length - 1) * 16}px` }}>
                          {/* dynamic width sizing ^ */}
                          {movies.map((movie) => (
                        
                        <div key={movie.id} className='movie-box flex-shrink-0 w-[160px] h-[260px] relative top-4' onClick={() => router.push(`/summary/${movie.id}`)}>


                              <div className='premium-pill w-full h-full group cursor-pointer rounded-lg overflow-hidden'>

                                {/* Premium pill */}
                                {!isSubscribed && movie.subscriptionRequired && (
                                  <div className='premium-pill absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-10'>
                                    Premium
                                  </div>
                                )}
                              <Image
                                  src={movie.imageLink}
                                  alt={movie.title}
                                  fill
                                  className='object-cover rounded-2xl'
                                  />
                              


                              {/* Hover overlay */}
                              <div className='hover-overlay-container absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100'>
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
            )}
          </div>
        </div>
      </div>
    </>
  )
}
