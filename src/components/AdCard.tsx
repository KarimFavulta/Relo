import React from 'react';
import { ExternalLink, Clock, Check, X } from 'lucide-react';
import { ServerAd } from '../types';
import { motion } from 'framer-motion';

interface AdCardProps {
  ad: ServerAd;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-[#1A0F2E] to-[#2D1B4E] rounded-lg overflow-hidden shadow-lg"
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(138, 43, 226, 0.5)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-white text-xl font-bold">{ad.title}</h3>
          <div className="flex items-center">
            {ad.approved ? (
              <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                <Check size={12} className="mr-1" /> Approved
              </span>
            ) : (
              <span className="bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                <Clock size={12} className="mr-1" /> Pending
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-300 mb-4 h-20 overflow-hidden">{ad.description}</p>
        
        <div className="flex items-center text-purple-300 text-sm mb-6">
          <Clock size={14} className="mr-1" />
          <span>Posted {formatDate(ad.createdAt)}</span>
        </div>
        
        <a 
          href={ad.inviteLink} 
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

export default AdCard;