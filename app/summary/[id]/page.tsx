'use client'

import Sidebar from '@/components/Sidebar'
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline'
import { BoltIcon, BookmarkIcon, CalendarDateRangeIcon, MagnifyingGlassIcon, MicrophoneIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { openLoginModal } from '@/redux/slices/modalSlice'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function Page({ params }: { params: { id: string } }) {
    const movieId = params.id
    const router = useRouter()
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const isSubscribed = Boolean(user?.isSubscribed)
    
    const [movie, setMovie] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isFavorited, setIsFavorited] = useState(false)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setIsLoggedIn(!!currentUser)
      })
      return unsubscribe
    }, [])

    useEffect(() => {
      const fetchMovie = async () => {
        try {
          const response = await fetch(`https://advanced-internship-api-production.up.railway.app/movies/${movieId}`)
          const data = await response.json()
          setMovie(data.data)
        } catch (error) {
          console.error('Error fetching movie:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchMovie()
    }, [movieId])

    const handleSummarizeClick = () => {
      // Not logged in - show login modal
      if (!isLoggedIn) {
        dispatch(openLoginModal())
        return
      }

      // Logged in - check subscription
      if (movie.subscriptionRequired && !isSubscribed) {
        // Premium movie and not subscribed - send to plans page
        router.push('https://hollywoodai.vercel.app/plans')
        return
      }

      // Free movie or subscribed - send to player
      router.push(`/player/${movieId}`)
    }

    const handleFavoriteClick = () => {
      // Not logged in - show login modal
      if (!isLoggedIn) {
        dispatch(openLoginModal())
        return
      }

      // Logged in - toggle favorite
      setIsFavorited(!isFavorited)
      
      // Save to local storage or your backend
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      
      if (!isFavorited) {
        // Add to favorites
        if (!favorites.some((fav: any) => fav.id === movie.id)) {
          favorites.push(movie)
        }
      } else {
        // Remove from favorites
        const updatedFavorites = favorites.filter((fav: any) => fav.id !== movie.id)
        favorites.length = 0
        favorites.push(...updatedFavorites)
      }
      
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }

    if (loading) {
      return <div className="p-8">Loading...</div>
    }

    if (!movie) {
        return <div className="p-8">Movie not found</div>
    }
  
    return (
    <>
        <div className='flex'>
            <Sidebar />
            <div className='w-full'>
                <div className='relative w-[400px] p-8 pl-0 left-40'>
                                <input placeholder='Search for movies...' 
                                className='bg-gray-200 w-full h-[40px] border-none outline-none rounded-full p-5 pl-12 text-sm' 
                                type="text" 
                                />
                              <MagnifyingGlassIcon height={20} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600'/>
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
                                <span className='text-sm'>{movie.type}</span>
                                <CalendarDateRangeIcon className='h-5 w-5'/>
                                <span className='text-sm'>{movie.releaseYear}</span>
                            </div>
                        </div>

                        <div className='flex gap-4 mb-8 flex-col'>
                            <button 
                              onClick={handleSummarizeClick}
                              className='bg-purple-700 text-white px-8 py-2 rounded-md font-semibold flex items-center gap-2 justify-center h-[50px] w-[300px] hover:bg-purple-800'>
                                Summarize <BoltIcon height={20}/>
                            </button>
                            <button 
                              onClick={handleFavoriteClick}
                              className={`font-semibold flex items-center mt-2 mb-4 ml-0 ${isFavorited ? 'text-red-500' : 'text-blue-500'}`}>
                                <BookmarkIcon height={30} className='pr-3'/> {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </div>

                        <div>
                            <h2 className='text-xl font-bold mb-4'>What's it about?</h2>
                            <div className='flex gap-2 mb-4'>
                              {(Array.isArray(movie.tags)
                                ? movie.tags
                                : (typeof movie.tags === 'string' ? movie.tags.split(',').map((t:string)=>t.trim()) : [])
                              ).map((tag: string) => (
                                <span key={tag} className='bg-gray-100 px-3 py-1 rounded text-sm'>{tag}</span>
                              ))}
                            </div>
                            <p className='text-gray-700 text-sm leading-relaxed'>
                                {movie.movieDescription}
                            </p>
                        </div>
                    </div>

                    <div className='flex-shrink-0'>
                        <div className='w-50 h-80 bg-gray-200 rounded-lg overflow-hidden'>
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