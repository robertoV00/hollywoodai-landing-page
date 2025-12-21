'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import { AudioPlayerProvider } from '../../context/audio-player-context'
import { TrackInfo } from '@/components/TrackInfo'
import { Controls } from '@/components/Controls'
import { ProgressBar } from '@/components/ProgressBar'
import { VolumeControls } from '@/components/VolumeControls'

export default function PlayerPage({ params }: { params: { id: string } }) {
  const movieId = params.id
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>
  }

  if (!movie) {
    return <div className="p-8 text-white">Movie not found</div>
  }

  return (
    <AudioPlayerProvider>
      <div className='flex h-screen bg-white'>
        <Sidebar />
        
        <div className='flex-1 flex flex-col'>
          {/* Main content area */}
          <div className='flex-1 overflow-y-auto p-8 flex justify-center'>
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

        <div className=''>
          {/* Audio Player at bottom */}
          <div className='bg-gray-800 border-t border-gray-700 p-2'>
            <div className='max-w-6xl mx-auto flex items-center justify-between'>
              {/* Track Info - Left */}
              <div className='flex-shrink-0 flex items-center'>
                <TrackInfo movieId={params.id} />
                <div>
                  <h3 className='text-white'>{movie.title}</h3>
                  <h3 className='text-blue-200'>{movie.director}</h3>
                </div>
              </div>

              {/* Controls - Center */}
              <div className='flex-1 flex justify-center px-4'>
                <Controls />
              </div>

              {/* Progress Bar - Right */}
              <div className='flex-shrink-0 w-32'>
                <ProgressBar />
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </AudioPlayerProvider>
  )
}