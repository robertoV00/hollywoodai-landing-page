import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
} from 'react-icons/bs';
import { useAudioPlayerContext } from '@/app/context/audio-player-context';

export const Controls = () => {
  const { currentTrack, 
    audioRef, 
    setDuration, 
    duration, 
    setTimeProgress, 
    progressBarRef, 
    isPlaying,
    setIsPlaying
   } = useAudioPlayerContext();

  //Handles skipping forward by 15 seconds
  const skipForward = () => {
  if (audioRef.current) {
    audioRef.current.currentTime += 15;
    updateProgress();
  }
};

  //Handles skipping backwards by 15 seconds
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
      updateProgress();
    }
};

  /* This function runs when the audio file is loaded
  1. Gets the track duration by retrieving how long the audio track is from the audio element
  2. Stores the duration using setDuration() so other components can use it
  3. Sets the progress bar's max value by telling the progress bar that its maximum value equals the track's total duration
  */
  const onLoadedMetadata = () =>{
    const seconds = audioRef.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }

  };

  //Updates the progress bar and time progress state as the audio plays
  const updateProgress = useCallback(() =>{
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration,setTimeProgress, audioRef, progressBarRef]);

  //plays or pauses the audio based on the isPlaying state and starts or stops the animation accordingly
  const startAnimation = useCallback(() =>{
  if (audioRef.current && progressBarRef.current && duration) {
    const animate = () => {
      updateProgress();
      playAnimationRef.current = requestAnimationFrame(animate);
    };
    playAnimationRef.current = requestAnimationFrame(animate);
  }
}, [updateProgress, duration, audioRef, progressBarRef]);

  const playAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
        audioRef.current?.play();
        console.log(audioRef.current)
        startAnimation();
    } else {
        audioRef.current?.pause();
        if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
        }
        updateProgress(); // Ensure progress is updated immediately when paused
    }
    return () =>{
        if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        }
    };
    }, [isPlaying, startAnimation, updateProgress, audioRef]);

  return (

    <div className="flex gap-4 items-center">
      <audio 
      src={`https://advanced-internship-api-production.up.railway.app/${currentTrack.src}`} 
      ref={audioRef}
      onLoadedMetadata={onLoadedMetadata}
      />
      
      <button onClick={skipBackward} className='text-white'>
        <BsFillRewindFill size={20} className=''/>
        <span>15</span>
      </button>
      <button onClick={() => setIsPlaying((prev) => !prev)} className='border-2 p-2 rounded-full border-white bg-white transition'>
        {isPlaying ? (
          <BsFillPauseFill size={30} />
        ) : (
          <BsFillPlayFill size={30} />
        )}
      </button>
      <button onClick={skipForward} className='text-white'>
        <BsFillFastForwardFill size={20} />
        <span>15</span>
      </button>
    </div>
  );
};