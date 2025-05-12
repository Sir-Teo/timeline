'use client';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaHeart, FaCamera, FaVideo, FaComment } from 'react-icons/fa';
import TimelineItem, { TimelineItemType } from './TimelineItem';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';

interface TimelineProps {
  items: TimelineItemType[];
}

export default function Timeline({ items }: TimelineProps) {
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px",
    amount: 0.2
  });
  
  // Create an array of refs for tracking item visibility
  const itemsInView = items.map(() => useState(false));
  
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);
  
  useEffect(() => {
    // Check if we're on the client-side
    if (typeof window !== 'undefined') {
      // Initial check
      checkMobile();
      
      // Add event listener for window resize
      window.addEventListener('resize', checkMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [checkMobile]);
  
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

  // Determine animation settings based on device and user preferences
  const getAnimationSettings = (isInView: boolean) => {
    // If user prefers reduced motion or is on mobile, use simpler animations
    if (shouldReduceMotion || isMobile) {
      return {
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : { opacity: 0 },
        transition: { duration: 0.3 }
      };
    }
    
    // Full animations for desktop
    return {
      initial: { opacity: 0, y: 50 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    };
  };

  return (
    <motion.div 
      ref={timelineRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="timeline-container px-2 sm:px-4"
    >
      <VerticalTimeline
        animate={!shouldReduceMotion}
        lineColor="rgb(147, 51, 234)"
        layout={isMobile ? "1-column-left" : "1-column"}
        className={isMobile ? "vertical-timeline--mobile" : ""}
      >
        {items.map((item, index) => {
          const [isVisible, setIsVisible] = itemsInView[index];
          
          // Calculate delay based on index, but shorter on mobile
          const delay = isMobile ? (index % 3) * 0.1 : index * 0.15;
          const animSettings = getAnimationSettings(isVisible);
          
          return (
            <motion.div
              key={item.id}
              ref={(el) => {
                // Set up intersection observer for this item
                if (!el) return;
                
                const observer = new IntersectionObserver(
                  ([entry]) => {
                    setIsVisible(entry.isIntersecting);
                  },
                  { 
                    threshold: 0.3,
                    rootMargin: "-10% 0px"
                  }
                );
                
                observer.observe(el);
                
                // Cleanup
                return () => observer.disconnect();
              }}
              initial={animSettings.initial}
              animate={animSettings.animate}
              transition={{ 
                ...animSettings.transition,
                delay 
              }}
              className="timeline-item-container"
            >
              <TimelineItem
                date={item.date}
                title={item.title}
                description={item.description}
                mediaType={item.mediaType}
                mediaUrl={item.mediaUrl}
                icon={item.icon || getIcon(item.mediaType)}
              />
            </motion.div>
          );
        })}
      </VerticalTimeline>
    </motion.div>
  );
} 