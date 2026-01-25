'use client'

import Sidebar from '@/components/Sidebar'
import LoginModal from '@/components/modals/LoginModal'
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline'
import { BoltIcon, BookmarkIcon, CalendarDateRangeIcon, MagnifyingGlassIcon, MicrophoneIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { openLoginModal } from '@/redux/slices/modalSlice'
import { addFavorite, removeFavorite } from '@/redux/slices/favoritesSlice'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import SearchBox from '@/components/SearchBox'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function Page({ params }: { params: { id: string } }) {
    const movieId = params.id
    const router = useRouter()
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const favorites = useSelector((state: RootState) => state.favorites.movies)
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
          // Check if movie is already favorited
          const isFav = favorites.some(fav => fav.id === data.data.id)
          setIsFavorited(isFav)
        } catch (error) {
          console.error('Error fetching movie:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchMovie()
    }, [movieId, favorites])

    const handleSummarizeClick = () => {
      // Not logged in - show login modal
      if (!user?.uid) {
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
      // Toggle favorite without requiring login
      setIsFavorited(!isFavorited)
      
      if (!isFavorited) {
        // Add to favorites
        dispatch(addFavorite(movie))
      } else {
        // Remove from favorites
        dispatch(removeFavorite(movie.id))
      }
    }

    if (loading) {
        return (
            <>
                <div className='flex'>
                    <Sidebar />
                    <div className='w-full'>
                        <SearchBox />
                        <div className='p-14 pl-48 pr-48 flex gap-8'>
                            <div className='flex-1'>
                                <div className='border-b-2 pb-4'>
                                    <Skeleton height={40} width='40%' className='mb-4' />
                                    <Skeleton height={20} width='20%' className='mb-4'/>
                                    <Skeleton height={20} width='25%' className=''/>
                                </div>
                                <div className='flex gap-5 mb-8 border-b-2 flex-col pt-8 pb-8'>
                                      <Skeleton height={20} width='10%' />
                                      <Skeleton height={20} width='10%' />
                                </div>
                                <div className='flex gap-5 mb-8 flex-col pt-2 pb-8'>
                                    <Skeleton height={50} width='40%' className='mt-4' />
                                    <Skeleton height={35} width='20%' className='' />
                                    <Skeleton height={30} width='15%' className='mt-2' />
                                    <div>
                                      <Skeleton height={20} className='mt-0' />
                                      <Skeleton height={20} className='mt-0' />
                                      <Skeleton height={20} className='mt-0' />
                                      <Skeleton height={20} className='mt-0' />
                                      <Skeleton height={20} className='mt-0' />
                                    </div>
                                  
                                </div>
                            </div>
                            <div className='w-[250px] flex-shrink-0'>
                                <Skeleton height={350} width='100%' />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
    <>
        {/* <LoginModal className=""/> */}
        <div className='flex'>
            <Sidebar />
            <div className='w-full'>
                <SearchBox />
                <div className='p-14 pl-48 pr-48 flex gap-8'>
                    <div className='flex-1'>
                        <div className='border-b-2'>
                            <h1 className='text-4xl font-bold mb-2'>{movie.title}</h1>
                            <p className='text-gray-500 mb-6'>{movie.director}</p>
                        </div>

                          <div className='flex gap-5 mb-8 border-b-2 flex-col pt-8 pb-8'>
                              <div className='icons-left-side flex items-center gap-2'>
                                  <StarIcon className='h-5 w-5'/>
                                  <span className='text-sm'>{movie.rating} / 10</span>
                                  <div className="clock-icon-box-position flex relative left-20 gap-2">
                                    <ClockIcon className='h-5 w-5'/>
                                    <span className='text-sm'>10:00</span>
                                  </div>
                              </div>
                              
                              <div className='icons-right-side flex items-center gap-2'>
                                  <MicrophoneIcon className='h-5 w-5'/>
                                  <span className='text-sm'>{movie.type}</span>
                                  <div className="calendar-icon-box-position flex gap-2 relative left-12">
                                    <CalendarDateRangeIcon className='h-5 w-5'/>
                                    <span className='text-sm'>{movie.releaseYear}</span>
                                  </div>
                              </div>

                        </div>

                        <div className='summary-container flex gap-4 mb-8 flex-col'>
                            <button 
                              onClick={handleSummarizeClick}
                              className='bg-purple-700 text-white px-8 py-2 rounded-md font-semibold flex items-center gap-2 justify-center h-[50px] w-[300px] hover:bg-purple-800'>
                                Summarize <BoltIcon height={20}/>
                            </button>
                            <button 
                              onClick={handleFavoriteClick}
                              className={`favorite-button font-semibold flex items-center mt-2 mb-4 ml-0 ${isFavorited ? 'text-red-500' : 'text-blue-500'}`}>
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