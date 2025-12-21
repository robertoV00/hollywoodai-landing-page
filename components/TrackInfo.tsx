'use client'

import { useEffect, useState } from 'react';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { useAudioPlayerContext } from '../app/context/audio-player-context';
import { RiMovie2AiFill } from 'react-icons/ri';
import Image from 'next/image';

interface TrackInfoProps {
  movieId: string;
}


export const TrackInfo = ({ movieId }: TrackInfoProps) => {

  const [movie, setMovie] = useState<any>(null)
  const { currentTrack } = useAudioPlayerContext();
  const [loading, setLoading] = useState(true);

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
  
  console.log(movie)

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-24 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
        {currentTrack.thumbnail ? (
          <Image
            className="w-full h-full object-cover"
            src={currentTrack.thumbnail}
            alt="audio avatar"
            width={90}
            height={90}
          />
        ) : (
          <Image
            className="w-full h-full object-cover"
            src={movie?.imageLink}
            alt="movie poster"
            width={90}
            height={90}
          />
        )}
      </div>
      <div>
        <p className="font-bold lg:truncate lg:max-w-64">
          {currentTrack.title}
        </p>
        <p className="text-sm text-gray-400">{currentTrack.author}</p>
      </div>
    </div>
  );
};