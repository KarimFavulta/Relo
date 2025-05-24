import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import YouTube from 'react-youtube';
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

// Extract YouTube video ID from URL
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Sample playlist
const samplePlaylist: Song[] = [
  {
    id: '1',
    title: 'Reload - 1 Appel, 0 Problème !',
    artist: 'Reload Ta Pub',
    url: 'https://youtu.be/0ycrBHxbolE',
    coverArt: 'https://media.discordapp.net/attachments/1372686113826934855/1375909100017160402/ReloadFrance.png?ex=683366b4&is=68321534&hm=d7ada5e5d94e8ccd693d3eff30d21c4e0e9a7e71f8be12b85f1b47865727b594&=&format=webp&quality=lossless',
  },
  {
    id: '2',
    title: 'Digital Dreams',
    artist: 'Reload Music',
    url: 'https://youtu.be/jfKfPfyJRdk',
    coverArt: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    title: 'Neon Nights',
    artist: 'Reload Music',
    url: 'https://youtu.be/rUxyKA_-grg',
    coverArt: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist] = useState<Song[]>(samplePlaylist);
  const [volume, setVolumeState] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const playSong = useCallback((song: Song) => {
    if (currentSong?.id === song.id) {
      playerRef.current?.playVideo();
      setIsPlaying(true);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  }, [currentSong]);

  const pauseSong = useCallback(() => {
    playerRef.current?.pauseVideo();
    setIsPlaying(false);
  }, []);

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
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  }, [volume, previousVolume, setVolume]);

  // Hidden YouTube player
  const youtubePlayer = currentSong && (
    <div className="hidden">
      <YouTube
        videoId={getYouTubeId(currentSong.url)}
        opts={{
          height: '0',
          width: '0',
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
          },
        }}
        onReady={(event) => {
          playerRef.current = event.target;
          event.target.setVolume(volume);
          if (isPlaying) {
            event.target.playVideo();
          }
        }}
        onStateChange={(event) => {
          if (event.data === YouTube.PlayerState.ENDED) {
            nextSong();
          } else if (event.data === YouTube.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === YouTube.PlayerState.PAUSED) {
            setIsPlaying(false);
          }
        }}
      />
    </div>
  );

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
      {youtubePlayer}
      {children}
    </MusicContext.Provider>
  );
};