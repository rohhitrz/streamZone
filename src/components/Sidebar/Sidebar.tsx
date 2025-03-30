'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { streamers, getLiveStreamers } from '@/data/streamers';
import { formatViewerCount } from '@/data/stream';
import { Streamer } from '@/types';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  onCollapse?: (isCollapsed: boolean) => void;
}

export default function Sidebar({ onCollapse }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [liveStreamers, setLiveStreamers] = useState<Streamer[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Check if sidebar collapsed state is saved in localStorage
    const savedCollapsedState = localStorage.getItem('streamzone-sidebar-collapsed');
    if (savedCollapsedState) {
      const isCollapsed = JSON.parse(savedCollapsedState);
      setCollapsed(isCollapsed);
      if (onCollapse) onCollapse(isCollapsed);
    }
    
    // Get live streamers
    setLiveStreamers(getLiveStreamers());
    
    // Setup a timer to randomize viewer counts to simulate live changes
    const interval = setInterval(() => {
      setLiveStreamers(prev => 
        prev.map(streamer => ({
          ...streamer,
          viewerCount: Math.floor(streamer.viewerCount * (0.95 + Math.random() * 0.1))
        }))
      );
    }, 30000);
    
    return () => clearInterval(interval);
  }, [onCollapse]);
  
  const toggleCollapse = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    localStorage.setItem('streamzone-sidebar-collapsed', JSON.stringify(newCollapsedState));
    if (onCollapse) onCollapse(newCollapsedState);
  };
  
  if (!isClient) {
    return null; // Avoid hydration mismatch
  }
  
  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        {!collapsed && <h3 className={styles.title}>Live Channels</h3>}
        <button 
          onClick={toggleCollapse} 
          className={styles.toggleButton}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>
      
      <div className={styles.streamerList}>
        <AnimatePresence>
          {liveStreamers.map((streamer) => (
            <motion.div
              key={streamer.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href={`/stream/${streamer.username}`} 
                className={styles.streamerLink}
              >
                <div className={styles.streamerAvatar}>
                  <div className={styles.avatarWrapper}>
                    <Image 
                      src={streamer.avatar} 
                      alt={streamer.displayName}
                      width={40}
                      height={40}
                      className={styles.avatar}
                    />
                    <span className={styles.liveBadge} />
                  </div>
                </div>
                
                {!collapsed && (
                  <div className={styles.streamerInfo}>
                    <span className={styles.streamerName}>{streamer.displayName}</span>
                    <span className={styles.streamerGame}>{streamer.category}</span>
                    <span className={styles.viewerCount}>
                      {formatViewerCount(streamer.viewerCount)} viewers
                    </span>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {!collapsed && (
        <div className={styles.footer}>
          <h4 className={styles.footerTitle}>Recommended Channels</h4>
          <div className={styles.recommendedList}>
            {streamers
              .filter(streamer => !streamer.isLive)
              .slice(0, 5)
              .map((streamer) => (
                <Link 
                  key={streamer.id}
                  href={`/stream/${streamer.username}`} 
                  className={styles.recommendedLink}
                >
                  <div className={styles.recommendedAvatar}>
                    <Image 
                      src={streamer.avatar} 
                      alt={streamer.displayName}
                      width={30}
                      height={30}
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.recommendedInfo}>
                    <span className={styles.recommendedName}>{streamer.displayName}</span>
                    <span className={styles.recommendedGame}>{streamer.category}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
} 