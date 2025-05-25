import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';

import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ServersPage from './pages/ServersPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/servers" element={<ServersPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            
            <MusicPlayer />
            <Toaster 
              position="top-right" 
              toastOptions={{
                style: {
                  background: '#2D1B4E',
                  color: 'white',
                  border: '1px solid #4C1D95',
                },
              }} 
            />
          </div>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;