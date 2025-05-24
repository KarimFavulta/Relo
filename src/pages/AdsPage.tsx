import React, { useState } from 'react';
import AdCard from '../components/AdCard';
import AdForm from '../components/AdForm';
import { serverAds } from '../data/serverAds';
import { motion } from 'framer-motion';

const AdsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'submit'>('browse');

  return (
    <div className="min-h-screen bg-[#0F0518] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Server Advertisements</h1>
          <p className="text-gray-300 mb-8 max-w-2xl">
            Browse server advertisements from our community or submit your own server to be featured.
          </p>
          
          {/* Tabs */}
          <div className="flex border-b border-purple-900 mb-8">
            <button
              className={`py-3 px-6 font-medium text-lg ${
                activeTab === 'browse' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('browse')}
            >
              Browse Ads
            </button>
            <button
              className={`py-3 px-6 font-medium text-lg ${
                activeTab === 'submit' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('submit')}
            >
              Submit Your Server
            </button>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'browse' ? (
            // Browse Ads
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serverAds.map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AdCard ad={ad} />
                </motion.div>
              ))}
            </div>
          ) : (
            // Submit Form
            <AdForm />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdsPage;