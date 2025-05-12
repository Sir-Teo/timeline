'use client';

import { useState } from 'react';
import Timeline from './components/Timeline';
import TimelineForm from './components/TimelineForm';
import { timelineItems as initialTimelineItems } from './data/timelineData';
import { FaHeart } from 'react-icons/fa';
import { TimelineItemType } from './components/TimelineItem';

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
    <div className="flex flex-col gap-6">
      <header className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
          Our Journey Together
        </h1>
        <div className="flex items-center justify-center gap-2 text-xl text-gray-600">
          <span>You</span>
          <FaHeart className="text-red-500" />
          <span>Me</span>
        </div>
      </header>

      <TimelineForm onAddItem={handleAddItem} />
      <Timeline items={timelineItems} />
      
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Made with love ❤️</p>
      </footer>
    </div>
  );
}
