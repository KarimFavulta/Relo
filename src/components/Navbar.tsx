import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Volume2, VolumeX, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { currentSong, isPlaying, pauseSong, playSong, toggleMute, volume } = useMusic();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#2D1B4E] shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              RELOAD
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-white hover:text-purple-300 transition-colors ${isActive('/') ? 'font-bold text-purple-300' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/servers" 
              className={`text-white hover:text-purple-300 transition-colors ${isActive('/servers') ? 'font-bold text-purple-300' : ''}`}
            >
              Servers
            </Link>
            <Link 
              to="/about" 
              className={`text-white hover:text-purple-300 transition-colors ${isActive('/about') ? 'font-bold text-purple-300' : ''}`}
            >
              About
            </Link>

            {/* Music Controls */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMute} 
                className="text-white hover:text-purple-300 transition-colors"
                aria-label={volume > 0 ? "Mute" : "Unmute"}
              >
                {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              
              {currentSong && (
                <div className="text-sm text-white opacity-80 hidden lg:block">
                  {currentSong.title} - {currentSong.artist}
                </div>
              )}
            </div>

            {/* User Profile/Login */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img 
                    src={user?.avatar} 
                    alt={user?.name} 
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500" 
                  />
                  <span className="text-white text-sm hidden lg:inline">{user?.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="text-white hover:text-purple-300 transition-colors"
                  aria-label="Log out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-[#1A0F2E] shadow-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-white hover:text-purple-300 transition-colors py-2 ${isActive('/') ? 'font-bold text-purple-300' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/servers" 
              className={`text-white hover:text-purple-300 transition-colors py-2 ${isActive('/servers') ? 'font-bold text-purple-300' : ''}`}
              onClick={closeMenu}
            >
              Servers
            </Link>
            <Link 
              to="/about" 
              className={`text-white hover:text-purple-300 transition-colors py-2 ${isActive('/about') ? 'font-bold text-purple-300' : ''}`}
              onClick={closeMenu}
            >
              About
            </Link>

            {/* Music Controls for Mobile */}
            <div className="flex items-center space-x-3 py-2">
              <button 
                onClick={toggleMute} 
                className="text-white hover:text-purple-300 transition-colors"
                aria-label={volume > 0 ? "Mute" : "Unmute"}
              >
                {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              
              {currentSong && (
                <div className="text-sm text-white opacity-80">
                  {currentSong.title} - {currentSong.artist}
                </div>
              )}
            </div>

            {/* User Profile/Login for Mobile */}
            {isAuthenticated ? (
              <div className="flex items-center justify-between py-2 border-t border-purple-900">
                <div className="flex items-center space-x-2">
                  <img 
                    src={user?.avatar} 
                    alt={user?.name} 
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500" 
                  />
                  <span className="text-white text-sm">{user?.name}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="text-white hover:text-purple-300 transition-colors"
                  aria-label="Log out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-center mt-2"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar