import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaHeart, FaCamera, FaVideo, FaComment } from 'react-icons/fa';
import TimelineItem, { TimelineItemType } from './TimelineItem';

interface TimelineProps {
  items: TimelineItemType[];
}

export default function Timeline({ items }: TimelineProps) {
  const getIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'image':
        return <FaCamera />;
      case 'video':
        return <FaVideo />;
      case 'text':
        return <FaComment />;
      default:
        return <FaHeart />;
    }
  };

  return (
    <VerticalTimeline
      lineColor="#ddd"
      animate={true}
      className="vertical-timeline"
    >
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          date={item.date}
          title={item.title}
          description={item.description}
          mediaType={item.mediaType}
          mediaUrl={item.mediaUrl}
          icon={item.icon || getIcon(item.mediaType)}
        />
      ))}
    </VerticalTimeline>
  );
} 