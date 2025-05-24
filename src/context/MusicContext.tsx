import React, { createContext, useContext, useState, useCallback } from 'react';
import useSound from 'use-sound';
import { Song } from '../types';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  playlist: Song[];
  playSong: (song: Song) => void;
  pauseSong: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

// Sample playlist
const samplePlaylist: Song[] = [
  {
    id: '1',
    title: 'Reload - 1 Appel, 0 Problème !',
    artist: 'Reload Ta Pub',
    url: 'https://youtu.be/0ycrBHxbolE?si=mA-XNVngM1NoeWO0',
    coverArt: 'https://media.discordapp.net/attachments/1372686113826934855/1375909100017160402/ReloadFrance.png?ex=683366b4&is=68321534&hm=d7ada5e5d94e8ccd693d3eff30d21c4e0e9a7e71f8be12b85f1b47865727b594&=&format=webp&quality=lossless',
  },
  {
    id: '2',
    title: 'Digital Dreams',
    artist: 'Reload Music',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverArt: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    title: 'Neon Nights',
    artist: 'Reload Music',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverArt: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist] = useState<Song[]>(samplePlaylist);
  const [volume, setVolumeState] = useState(0.5);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [play, { stop }] = useSound(currentSong?.url || '', {
    volume: volume,
    onend: () => nextSong(),
  });

  const playSong = useCallback((song: Song) => {
    if (currentSong?.id === song.id) {
      play();
      setIsPlaying(true);
    } else {
      stop();
      setCurrentSong(song);
      setTimeout(() => {
        play();
        setIsPlaying(true);
      }, 100);
    }
  }, [currentSong, play, stop]);

  const pauseSong = useCallback(() => {
    stop();
    setIsPlaying(false);
  }, [stop]);

  const nextSong = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSong(playlist[nextIndex]);
  }, [currentSong, playlist, playSong]);

  const previousSong = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIndex]);
  }, [currentSong, playlist, playSong]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
  }, []);

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolumeState(0);
    } else {
      setVolumeState(previousVolume);
    }
  }, [volume, previousVolume]);

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        playlist,
        playSong,
        pauseSong,
        nextSong,
        previousSong,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
