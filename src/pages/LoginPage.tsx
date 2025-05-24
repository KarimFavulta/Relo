import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    toast.success('Successfully logged in!');
    navigate('/servers');
  };

  // If already logged in, redirect to servers page
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/servers');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[#0F0518] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1280')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0518]/90 via-[#1A0F2E]/90 to-[#2D1B4E]/90"></div>
        
        {/* Animated gradient circles */}
        <motion.div 
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-purple-600/20 filter blur-3xl"
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
          className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-blue-600/20 filter blur-3xl"
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
      
      <motion.div 
        className="bg-[#1A0F2E]/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Reload</h1>
          <p className="text-gray-300">Sign in to access exclusive Discord servers</p>
        </div>
        
        <button
          onClick={handleLogin}
          className="flex items-center justify-center w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-md transition-colors mb-4"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="mr-3">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Sign in with Google
        </button>
        
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-gray-700 flex-grow"></div>
          <div className="mx-4 text-gray-500 text-sm">or</div>
          <div className="border-t border-gray-700 flex-grow"></div>
        </div>
        
        <button
          onClick={handleLogin}
          className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
        >
          <LogIn size={20} className="mr-2" />
          Continue as Guest
        </button>
        
        <p className="text-gray-400 text-sm mt-6 text-center">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;