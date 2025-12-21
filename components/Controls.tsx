import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsShuffle,
  BsRepeat,
} from 'react-icons/bs';
//import { useAudioPlayerContext } from '../app/context/audio-player-context';
import { tracks } from '@/data/tracks';
import { useAudioPlayerContext } from '@/app/context/audio-player-context';

export const Controls = () => {

  const { currentTrack, 
    audioRef, 
    setDuration, 
    duration, 
    setTimeProgress, 
    progressBarRef, 
    setTrackIndex, 
    setCurrentTrack, 
    isPlaying,
    setIsPlaying
   } = useAudioPlayerContext();
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  //const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const skipForward = () => {
  if (audioRef.current) {
    audioRef.current.currentTime += 15;
    updateProgress();
  }
};
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
      updateProgress();
    }
};

  const handlePrevious = useCallback(() => {
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prev === 0
        ? tracks.length - 1
        : prev - 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex]);

  const handleNext = useCallback(() => {
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prev >= tracks.length - 1
        ? 0
        : prev + 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex]);

useEffect(() => {
    const currentAudioRef= audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        if (isRepeat) {
          currentAudioRef.play();
        } else {
          handleNext();// This function should handle both shuffle and non-shuffle scenarios
        }
      };
    }
    return () =>{
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [isRepeat, handleNext,audioRef]);

  const onLoadedMetadata = () =>{
    const seconds = audioRef.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }

  };

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
      src={currentTrack.src} 
      ref={audioRef}
      onLoadedMetadata={onLoadedMetadata}
      />
      
      {/* <button onClick={handlePrevious}>
        <BsSkipStartFill size={20} />
      </button> */}
      <button onClick={skipBackward} className='text-white'>
        <BsFillRewindFill size={20} className=''/>
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
      </button>
      {/* <button onClick={handleNext}>
        <BsSkipEndFill size={20} />
      </button>
      <button onClick={() => setIsShuffle((prev) => !prev)}>
        <BsShuffle
          size={20}
          className={isShuffle ?'text-[#f50]' : ''}
        />
      </button>
      <button onClick={() => setIsRepeat((prev) => !prev)}>
        <BsRepeat
          size={20}
          className={isRepeat ? 'text-[#f50]' : ''}
        />
      </button> */}
    </div>
  );
};