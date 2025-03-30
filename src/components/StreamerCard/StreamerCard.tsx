'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import { FiHeart, FiUsers, FiClock } from 'react-icons/fi';
import { Streamer } from '../../types';
import { formatViewerCount } from '../../data/stream';
import styles from './StreamerCard.module.scss';

interface StreamerCardProps {
  streamer: Streamer;
}

interface VanillaTiltNode extends HTMLDivElement {
  _vanilla?: {
    destroy: () => void;
  };
}

export default function StreamerCard({ streamer }: StreamerCardProps) {
  const cardRef = useRef<VanillaTiltNode>(null);
  
  useEffect(() => {
    // Initialize vanilla-tilt for 3D effect
    const currentRef = cardRef.current;
    if (currentRef) {
      VanillaTilt.init(currentRef, {
        max: 10,
        scale: 1.03,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
      });
    }
    
    return () => {
      // Destroy vanilla-tilt when component unmounts
      if (currentRef && currentRef._vanilla) {
        currentRef._vanilla.destroy();
      }
    };
  }, []);

  // Calculate stream duration if live
  const getStreamDuration = () => {
    if (!streamer.startedAt) return '';
    const startTime = new Date(streamer.startedAt).getTime();
    const currentTime = Date.now();
    const durationHours = Math.floor((currentTime - startTime) / (1000 * 60 * 60));
    const durationMinutes = Math.floor(((currentTime - startTime) % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${durationHours}h ${durationMinutes}m`;
  };
  
  return (
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/stream/${streamer.username}`} className={styles.link}>
        <div ref={cardRef} className={styles.card}>
          <div className={styles.thumbnailWrapper}>
            <Image
              src={streamer.thumbnailUrl}
              alt={streamer.title}
              className={styles.thumbnail}
              width={320}
              height={180}
            />
            
            {streamer.isLive && (
              <div className={styles.liveIndicator}>
                <span className={styles.liveText}>LIVE</span>
                <span className={styles.viewerCount}>
                  <FiUsers className={styles.icon} />
                  {formatViewerCount(streamer.viewerCount)}
                </span>
                <span className={styles.duration}>
                  <FiClock className={styles.icon} />
                  {getStreamDuration()}
                </span>
              </div>
            )}

            <div 
              className={styles.bannerOverlay}
              style={{ backgroundImage: `url(${streamer.bannerImage})` }}
            />
          </div>
          
          <div className={styles.infoWrapper}>
            <div className={styles.avatar}>
              <Image
                src={streamer.avatar}
                alt={streamer.displayName}
                width={50}
                height={50}
                className={styles.avatarImage}
              />
              {streamer.isFollowing && (
                <div className={styles.followingBadge}>
                  <FiHeart />
                </div>
              )}
            </div>
            
            <div className={styles.streamerInfo}>
              <h3 className={styles.title}>{streamer.title}</h3>
              <p className={styles.streamerName}>{streamer.displayName}</p>
              <p className={styles.category}>{streamer.category}</p>
              
              <div className={styles.tags}>
                {streamer.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 