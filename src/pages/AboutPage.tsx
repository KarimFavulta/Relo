import React from 'react';
import FounderCard from '../components/FounderCard';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  const founders = [
    {
      name: 'AyviTV',
      role: 'Founder',
      bio: 'Le bg de la street',
      image: 'https://media.discordapp.net/attachments/1372686113826934855/1375934931032604713/Pdpamoiwesh.jpg?ex=68337ec3&is=68322d43&hm=403023d7105a95a0005998beb534bce22ff758e6a5d8611059ce2fe74d6216af&=&format=webp',
    },
    {
      name: 'Wayzen',
      role: 'Founder',
      bio: 'Je suis normal walah pas de bio',
      image: 'https://images-ext-1.discordapp.net/external/ggsHTiaEBo1Rr2Gu8dOfWQ8FPvtWQdh5f1w0ZNlWLxg/%3Fsize%3D128/https/cdn.discordapp.com/avatars/1113193856683475045/a_08a26816c0613843bb07ffd7ce221acd.gif',
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0518] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">About Reload</h1>
          
          {/* Mission Statement */}
          <div className="bg-[#1A0F2E] rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Reload is a premier Discord advertising server dedicated to helping community owners grow 
              their servers and connect with like-minded individuals. We provide a platform where quality 
              Discord communities can showcase their servers and attract new members.
            </p>
            <p className="text-gray-300 text-lg">
              Founded in 2025, Reload has grown to become a hub for Discord server discovery, 
              with a focus on quality over quantity. We carefully review all servers to ensure 
              they meet our standards for activity, moderation, and content.
            </p>
          </div>
          
          {/* Founders Section */}
          <h2 className="text-2xl font-bold text-white mb-6">Meet Our Founders</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <FounderCard {...founder} />
              </motion.div>
            ))}
          </div>
          
          {/* Community Stats */}
          <h2 className="text-2xl font-bold text-white mb-6">Our Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#1A0F2E] rounded-lg p-6 text-center">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">41</h3>
              <p className="text-gray-300">Discord Members</p>
            </div>
            <div className="bg-[#1A0F2E] rounded-lg p-6 text-center">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">0</h3>
              <p className="text-gray-300">Partnered Servers</p>
            </div>
            <div className="bg-[#1A0F2E] rounded-lg p-6 text-center">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">0</h3>
              <p className="text-gray-300">Monthly Visitors</p>
            </div>
            <div className="bg-[#1A0F2E] rounded-lg p-6 text-center">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">98%</h3>
              <p className="text-gray-300">Satisfaction Rate</p>
            </div>
          </div>
          
          {/* Latest News */}
          <h2 className="text-2xl font-bold text-white mb-6">Latest Updates</h2>
          <div className="bg-[#1A0F2E] rounded-lg p-8 mb-5">
            <div className="mb-6 pb-6 border-b border-purple-900">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-white">Website Launch</h3>
                <span className="text-purple-400 text-sm">July 15, 2023</span>
              </div>
              <p className="text-gray-300">
                We're excited to announce the launch of our new website! Now you can browse 
                and join Discord servers directly from our platform.
              </p>
            </div>
            
            <div className="mb-6 pb-6 border-b border-purple-900">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-white">Server Verification System</h3>
                <span className="text-purple-400 text-sm">June 20, 2023</span>
              </div>
              <p className="text-gray-300">
                We've implemented a new verification system to ensure all servers in our network 
                maintain high standards of quality and safety.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;