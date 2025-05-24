import React, { useState } from 'react';
import { PlayCircle, PauseCircle, SkipForward, SkipBack, Volume, Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    playSong, 
    pauseSong, 
    nextSong, 
    previousSong, 
    playlist, 
    volume, 
    setVolume 
  } = useMusic();
  
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlayer = () => {
    setIsExpanded(!isExpanded);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-40 bg-[#2D1B4E] rounded-lg shadow-lg overflow-hidden"
      initial={{ width: "60px", height: "60px" }}
      animate={{ 
        width: isExpanded ? "300px" : "60px",
        height: isExpanded ? "auto" : "60px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button 
        onClick={togglePlayer} 
        className="absolute top-2 right-2 text-white/80 hover:text-white"
        aria-label={isExpanded ? "Minimize player" : "Expand player"}
      >
        {isExpanded ? (
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs">−</span>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {currentSong?.coverArt ? (
              <img 
                src={currentSong.coverArt} 
                alt="Music" 
                className="w-12 h-12 rounded-md object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-md bg-purple-700 flex items-center justify-center">
                <Volume2 size={24} className="text-white" />
              </div>
            )}
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="p-4">
              <div className="mb-4 flex justify-center">
                {currentSong?.coverArt ? (
                  <img 
                    src={currentSong.coverArt} 
                    alt={currentSong.title} 
                    className="w-40 h-40 object-cover rounded-md shadow-md"
                  />
                ) : (
                  <div className="w-40 h-40 bg-purple-900/50 rounded-md flex items-center justify-center">
                    <Volume2 size={48} className="text-white/50" />
                  </div>
                )}
              </div>

              <div className="text-center mb-4">
                <h3 className="text-white text-lg font-medium truncate">
                  {currentSong?.title || "Select a song"}
                </h3>
                <p className="text-purple-300 text-sm truncate">
                  {currentSong?.artist || "Reload Music"}
                </p>
              </div>

              <div className="flex justify-center items-center space-x-4 mb-4">
                <button 
                  onClick={previousSong} 
                  className="text-white hover:text-purple-300 transition"
                  aria-label="Previous song"
                  disabled={!currentSong}
                >
                  <SkipBack size={24} />
                </button>
                
                <button 
                  onClick={isPlaying ? pauseSong : () => currentSong && playSong(currentSong)} 
                  className="text-white hover:text-purple-300 transition"
                  aria-label={isPlaying ? "Pause" : "Play"}
                  disabled={!currentSong}
                >
                  {isPlaying ? (
                    <PauseCircle size={36} />
                  ) : (
                    <PlayCircle size={36} />
                  )}
                </button>
                
                <button 
                  onClick={nextSong} 
                  className="text-white hover:text-purple-300 transition"
                  aria-label="Next song"
                  disabled={!currentSong}
                >
                  <SkipForward size={24} />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <VolumeIcon />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="mt-4">
                <h4 className="text-white text-sm font-medium mb-2">Playlist</h4>
                <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                  {playlist.map((song) => (
                    <motion.div
                      key={song.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        currentSong?.id === song.id 
                          ? 'bg-purple-700/50 border border-purple-500' 
                          : 'hover:bg-purple-900/30'
                      }`}
                      onClick={() => playSong(song)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 mr-2 flex-shrink-0">
                        {song.coverArt ? (
                          <img 
                            src={song.coverArt} 
                            alt={song.title} 
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-purple-700 rounded flex items-center justify-center">
                            <Volume2 size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-white text-xs font-medium truncate">{song.title}</p>
                        <p className="text-purple-300 text-xs truncate">{song.artist}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MusicPlayer;