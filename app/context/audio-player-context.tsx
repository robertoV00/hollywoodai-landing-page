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


export const AudioPlayerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Track>(
    tracks[trackIndex]
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