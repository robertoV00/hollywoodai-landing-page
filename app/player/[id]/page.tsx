'use client'

import { fetchTracks } from '@/data/tracks';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import { AudioPlayerProvider } from '../../context/audio-player-context'
import { TrackInfo } from '@/components/TrackInfo'
import { Controls } from '@/components/Controls'
import { ProgressBar } from '@/components/ProgressBar'
import { VolumeControls } from '@/components/VolumeControls'
import LoginModal from '@/components/modals/LoginModal'

export default function PlayerPage({ params }: { params: { id: string } }) {
  const movieId = params.id
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tracks, setTracks] = useState<any[]>([])



  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://advanced-internship-api-production.up.railway.app/movies/${movieId}`)
        const data = await response.json()
        setMovie(data.data)
        const fetchedTracks = await fetchTracks(movieId)
        console.log(fetchedTracks)
        setTracks(fetchedTracks)
      } catch (error) {
        console.error('Error fetching movie:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [movieId])

  if (loading) {
    return (
      <AudioPlayerProvider initialTracks={[]}>
        <div className='flex h-screen bg-white'>
          <Sidebar />
          <div className='flex-1 flex items-center justify-center'>
            <div className='flex flex-col items-center gap-4'>
              <div className='w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin'></div>
              <p className='text-gray-600'>Loading...</p>
            </div>
          </div>
        </div>
      </AudioPlayerProvider>
    )
  }

  if (!movie) {
    return <div className="p-8 text-white">Movie not found</div>
  }

  return (
    <AudioPlayerProvider initialTracks={tracks}>
      {/* <LoginModal /> */}
      <div className='flex h-screen bg-white'>
        <Sidebar />
        
        <div className='flex-1 flex flex-col min-w-0'>
          <SearchBox />
          {/* Main content area */}
          <div className='main-content flex-1 overflow-y-auto p-8 pl-10 pr-10 2xl:pl-48 2xl:pr-48 flex flex-col md:flex-row justify-center'>
            <div className='max-w-7xl'>
              <h1 className='movie-title text-3xl font-bold text-black mb-4 pb-4 border-b border-gray-300'>{movie.title}</h1>              
              <div className='text-black space-y-4 pt-5 mb-8'>
                {movie.summary?.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className='text-black leading-relaxed text-[16px]'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player - full width outside the flex container */}
      <div className='player-master-container fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-2 z-50'>
        <div className='player-row max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2'>
          <div className='flex-shrink-0 flex items-center justify-start text-white'>
            <TrackInfo movieId={params.id} />
          </div>
          <div className='flex-1 flex justify-center px-4'>
            <Controls />
          </div>
          <div className='flex-1 min-w-0 md:max-w-[250px] w-[400px] justify-end'>
            <ProgressBar />
          </div>
        </div>
      </div>
      </AudioPlayerProvider>
  )
}