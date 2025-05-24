import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { playlist, playSong } = useMusic();

  // Auto play music when page loads
  useEffect(() => {
    if (playlist.length > 0) {
      playSong(playlist[0]);
    }
  }, [playlist, playSong]);

  return (
    <div className="min-h-screen bg-[#0F0518] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/7130497/pexels-photo-7130497.jpeg?auto=compress&cs=tinysrgb&w=1280')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0518]/90 via-[#1A0F2E]/90 to-[#2D1B4E]/90"></div>
          
          {/* Animated gradient circles */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 filter blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-600/20 filter blur-3xl"
            animate={{ 
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              RELOAD
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with the ultimate Discord advertising server. Grow your community faster.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <Link 
                  to="/servers" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center"
                >
                  Browse Servers <ArrowRight size={20} className="ml-2" />
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center"
                >
                  Login with Google
                </Link>
              )}
              
              <Link 
                to="/about" 
                className="bg-transparent border-2 border-purple-500 hover:border-purple-400 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowRight size={24} className="text-white/70 transform rotate-90" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1A0F2E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Join Reload?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#2D1B4E] p-6 rounded-lg">
                <div className="text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Grow Your Community</h3>
                <p className="text-gray-300">Connect with other server owners and expand your Discord community faster.</p>
              </div>
              
              <div className="bg-[#2D1B4E] p-6 rounded-lg">
                <div className="text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Active Promotion</h3>
                <p className="text-gray-300">Your server gets active promotion to our large community of Discord enthusiasts.</p>
              </div>
              
              <div className="bg-[#2D1B4E] p-6 rounded-lg">
                <div className="text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Control</h3>
                <p className="text-gray-300">We verify all servers to ensure a high-quality community without spam or harmful content.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0F0518]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Discord Server?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join Reload today and connect with a vibrant community of Discord enthusiasts.
            </p>
            
            <Link 
              to="/servers" 
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center"
            >
              Get Started <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;