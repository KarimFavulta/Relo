import React from 'react';
import { ExternalLink, Users } from 'lucide-react';
import { DiscordServer } from '../types';
import { motion } from 'framer-motion';

interface ServerCardProps {
  server: DiscordServer;
}

const categoryColors = {
  gaming: 'bg-purple-600',
  community: 'bg-blue-600',
  advertising: 'bg-emerald-600',
  other: 'bg-amber-600',
};

const categoryLabels = {
  gaming: 'Gaming',
  community: 'Community',
  advertising: 'Advertising',
  other: 'Other',
};

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-[#1A0F2E] to-[#2D1B4E] rounded-lg overflow-hidden shadow-lg"
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(138, 43, 226, 0.5)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative">
            <img 
              src={server.iconUrl} 
              alt={server.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
            />
            <span className={`absolute bottom-0 right-0 ${categoryColors[server.category]} text-white text-xs font-medium px-2 py-1 rounded-full`}>
              {categoryLabels[server.category]}
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-white text-xl font-bold mb-1">{server.name}</h3>
            {server.memberCount && (
              <div className="flex items-center text-purple-300 text-sm">
                <Users size={14} className="mr-1" />
                <span>{server.memberCount.toLocaleString()} members</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 h-20 overflow-hidden">{server.description}</p>
        
        <a 
          href={server.inviteLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Join Server <ExternalLink size={16} className="ml-2" />
        </a>
      </div>
    </motion.div>
  );
};

export default ServerCard;