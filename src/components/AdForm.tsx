import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { serverAds } from '../data/serverAds';

const AdForm: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('You must be logged in to submit an ad');
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new ad
    const newAd = {
      id: (serverAds.length + 1).toString(),
      title,
      description,
      serverId: Date.now().toString(),
      userId: user?.id || '',
      inviteLink,
      createdAt: new Date().toISOString(),
      approved: false
    };

    // Add to serverAds array
    serverAds.push(newAd);
    
    // Show success message and reset form
    toast.success('Your ad has been submitted for review!');
    setTitle('');
    setDescription('');
    setInviteLink('');
    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-[#1A0F2E]/80 backdrop-blur-sm rounded-lg p-6 text-center">
        <p className="text-white mb-4">You need to be logged in to submit a server advertisement.</p>
        <a href="/login" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
          Login to Continue
        </a>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-[#1A0F2E]/80 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-white text-xl font-bold mb-4">Submit Your Server</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-300 mb-2">
            Server Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#2D1B4E] border border-purple-700 rounded-md p-3 text-white"
            placeholder="Enter your server name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#2D1B4E] border border-purple-700 rounded-md p-3 text-white h-32"
            placeholder="Describe your server in detail..."
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="inviteLink" className="block text-gray-300 mb-2">
            Discord Invite Link
          </label>
          <input
            type="url"
            id="inviteLink"
            value={inviteLink}
            onChange={(e) => setInviteLink(e.target.value)}
            className="w-full bg-[#2D1B4E] border border-purple-700 rounded-md p-3 text-white"
            placeholder="https://discord.gg/your-invite"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Server for Review'}
        </button>
        
        <p className="text-gray-400 text-sm mt-4">
          All submissions are reviewed by our moderators before being published.
        </p>
      </form>
    </motion.div>
  );
};

export default AdForm;