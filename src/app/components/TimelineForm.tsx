'use client';

import { useState } from 'react';
import { TimelineItemType } from './TimelineItem';

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
      <div className="flex justify-center my-8">
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add New Memory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add New Memory</h2>
        <button 
          onClick={() => setIsFormOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g., January 1, 2023"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Our First Date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell your story..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-24"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Media Type
          </label>
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as 'text' | 'image' | 'video')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="text">Text Only</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        
        {mediaType !== 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Media URL
            </label>
            <input
              type="text"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder={mediaType === 'image' ? "/images/your-image.jpg" : "/videos/your-video.mp4"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Note: Add your media files to the public folder first.
            </p>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Add Memory
          </button>
        </div>
      </form>
    </div>
  );
} 