import React, { useState, useEffect } from 'react';
import AdCard from '../components/AdCard';
import AdForm from '../components/AdForm';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ServerAd } from '../types';
import { useAuth } from '../context/AuthContext';

const AdsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'submit'>('browse');
  const [ads, setAds] = useState<ServerAd[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        let query = supabase
          .from('server_ads')
          .select('*')
          .order('created_at', { ascending: false });

        if (!isAuthenticated) {
          query = query.eq('approved', true);
        }

        const { data, error } = await query;

        if (error) throw error;
        setAds(data || []);
      } catch (error) {
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();

    // Subscribe to changes
    const subscription = supabase
      .channel('server_ads_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'server_ads' }, fetchAds)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [isAuthenticated]);

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
            loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                <p className="text-gray-400 mt-4">Loading advertisements...</p>
              </div>
            ) : ads.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ads.map((ad, index) => (
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
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No advertisements found.</p>
                <button
                  onClick={() => setActiveTab('submit')}
                  className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Submit the first ad
                </button>
              </div>
            )
          ) : (
            <AdForm />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdsPage;