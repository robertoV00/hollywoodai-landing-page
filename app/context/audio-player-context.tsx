"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
  RefObject,
  useEffect,
} from 'react';
import { tracks } from '../../data/tracks';


export interface Track {
  title: string;
  src: string;
  author: string;
  thumbnail?: string;
}


interface AudioPlayerContextType {
  currentTrack: Track;
  setCurrentTrack: Dispatch<SetStateAction<Track>>;
  audioRef: RefObject<HTMLAudioElement>,
  progressBarRef: RefObject<HTMLInputElement>,
  timeProgress: number,
  duration: number,
  setDuration: Dispatch<SetStateAction<number>>,
  isPlaying: boolean,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
  setTimeProgress: Dispatch<SetStateAction<number>>,
  setTrackIndex: Dispatch<SetStateAction<number>>,
}


const AudioPlayerContext = createContext<
  AudioPlayerContextType | undefined
>(undefined);

interface AudioPlayerProviderProps {
  children: ReactNode;
  initialTracks?: Track[];
}

export const AudioPlayerProvider = ({
    children,
  initialTracks = []
}: AudioPlayerProviderProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [currentTrack, setCurrentTrack] = useState<Track>(
    initialTracks.length > 0 ? initialTracks[0] : { title: '', src: '', author: '' }
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  
  const contextValue: AudioPlayerContextType = {
    currentTrack,
    setCurrentTrack,
    audioRef,
    progressBarRef,
    timeProgress,
    setTimeProgress,
    duration,
    setDuration,
    setTrackIndex,
    isPlaying,
    setIsPlaying,
  };
  
  useEffect(() => {
    if (initialTracks.length > 0) {
      setTracks(initialTracks);
      setCurrentTrack(initialTracks[0]);
    }
  }, [initialTracks]);

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      <audio ref={audioRef} />
      {children}
    </AudioPlayerContext.Provider>
  );
  
};


export const useAudioPlayerContext = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      'useAudioPlayerContext must be used within an AudioPlayerProvider'
    );
  }
  return context;
};