'use client';

import { useState } from 'react';
import { TimelineItemType } from './TimelineItem';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineFormProps {
  onAddItem: (item: Omit<TimelineItemType, 'id'>) => void;
}

export default function TimelineForm({ onAddItem }: TimelineFormProps) {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState<'text' | 'image' | 'video'>('text');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onAddItem({
      date,
      title,
      description,
      mediaType,
      mediaUrl: mediaType !== 'text' ? mediaUrl : undefined
    });
    
    // Reset form
    setDate('');
    setTitle('');
    setDescription('');
    setMediaType('text');
    setMediaUrl('');
    setIsFormOpen(false);
  };

  if (!isFormOpen) {
    return (
      <motion.div 
        className="flex justify-center my-6 sm:my-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto max-w-xs"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Add New Memory
        </motion.button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="max-w-lg mx-auto my-6 sm:my-8 p-4 sm:p-6 bg-white rounded-xl shadow-md"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h2 
            className="text-lg sm:text-xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Add New Memory
          </motion.h2>
          <motion.button 
            onClick={() => setIsFormOpen(false)}
            className="text-gray-500 hover:text-gray-700 p-2 -mr-2"
            aria-label="Close form"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            ✕
          </motion.button>
        </div>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., January 1, 2023"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Our First Date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell your story..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base min-h-24"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Media Type
            </label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as 'text' | 'image' | 'video')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            >
              <option value="text">Text Only</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </motion.div>
          
          <AnimatePresence>
            {mediaType !== 'text' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Media URL
                </label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder={mediaType === 'image' ? "/images/your-image.jpg" : "/videos/your-video.mp4"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Note: Add your media files to the public folder first.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="flex justify-end pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Add Memory
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
} 