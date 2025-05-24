import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

interface FounderCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  github?: string;
  twitter?: string;
}

const FounderCard: React.FC<FounderCardProps> = ({ 
  name, 
  role, 
  bio, 
  image, 
  github, 
  twitter 
}) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-[#1A0F2E] to-[#2D1B4E] rounded-lg overflow-hidden shadow-lg"
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(138, 43, 226, 0.5)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={image} 
            alt={name} 
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
          />
          <div className="ml-4">
            <h3 className="text-white text-xl font-bold">{name}</h3>
            <p className="text-purple-300">{role}</p>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6">{bio}</p>
        
        <div className="flex space-x-3">
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-purple-900 hover:bg-purple-800 text-white p-2 rounded-full transition-colors"
            >
              <Github size={20} />
            </a>
          )}
          
          {twitter && (
            <a 
              href={twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-purple-900 hover:bg-purple-800 text-white p-2 rounded-full transition-colors"
            >
              <Twitter size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FounderCard;