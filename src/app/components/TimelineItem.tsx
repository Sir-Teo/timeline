import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import Image from 'next/image';

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
      }}
      contentArrowStyle={{ borderRight: '7px solid white' }}
      date={date}
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={icon}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      
      {mediaType === 'text' ? null : (
        <div className="mt-4 overflow-hidden rounded-lg">
          {mediaType === 'image' && mediaUrl && (
            <div className="relative h-64 w-full">
              <Image 
                src={mediaUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {mediaType === 'video' && mediaUrl && (
            <video 
              controls
              className="w-full h-auto rounded-lg"
            >
              <source src={mediaUrl} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </VerticalTimelineElement>
  );
} 