import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type TimelineItemType = {
  id: string;
  date: string;
  title: string;
  description: string;
  mediaType: 'text' | 'image' | 'video';
  mediaUrl?: string;
  icon?: React.ReactNode;
};

export default function TimelineItem({ 
  date, 
  title, 
  description, 
  mediaType, 
  mediaUrl, 
  icon 
}: Omit<TimelineItemType, 'id'>) {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element"
      contentStyle={{ 
        background: 'white', 
        color: '#333',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '0.75rem',
        padding: '1.25rem',
      }}
      contentArrowStyle={{ borderRight: '7px solid white' }}
      date={date}
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={icon}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3 
          className="text-lg sm:text-xl font-bold mb-2 break-words"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {description}
        </motion.p>
        
        {mediaType === 'text' ? null : (
          <motion.div 
            className="mt-3 sm:mt-4 overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            {mediaType === 'image' && mediaUrl && (
              <div className="relative h-48 sm:h-64 w-full">
                <Image 
                  src={mediaUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            
            {mediaType === 'video' && mediaUrl && (
              <video 
                controls
                className="w-full h-auto rounded-lg"
                preload="metadata"
              >
                <source src={mediaUrl} />
                Your browser does not support the video tag.
              </video>
            )}
          </motion.div>
        )}
      </motion.div>
    </VerticalTimelineElement>
  );
} 