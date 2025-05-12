'use client';

import { useState } from 'react';
import Timeline from './components/Timeline';
import TimelineForm from './components/TimelineForm';
import { timelineItems as initialTimelineItems } from './data/timelineData';
import { FaHeart } from 'react-icons/fa';
import { TimelineItemType } from './components/TimelineItem';
import { motion } from 'framer-motion';

export default function Home() {
  const [timelineItems, setTimelineItems] = useState<TimelineItemType[]>(initialTimelineItems);

  const handleAddItem = (newItem: Omit<TimelineItemType, 'id'>) => {
    const item: TimelineItemType = {
      ...newItem,
      id: `item-${Date.now()}`
    };
    
    setTimelineItems(prev => [item, ...prev]);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <motion.header 
        className="text-center py-6 sm:py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-3 sm:mb-4 px-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Our Journey Together
        </motion.h1>
        <motion.div 
          className="flex items-center justify-center gap-2 text-lg sm:text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            You
          </motion.span>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <FaHeart className="text-red-500" />
          </motion.div>
          <motion.span
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Me
          </motion.span>
        </motion.div>
      </motion.header>

      <TimelineForm onAddItem={handleAddItem} />
      <Timeline items={timelineItems} />
      
      <motion.footer 
        className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.p
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Made with love ❤️
        </motion.p>
      </motion.footer>
    </div>
  );
}
