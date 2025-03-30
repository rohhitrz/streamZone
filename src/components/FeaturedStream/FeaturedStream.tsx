'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player/lazy';
import { Streamer } from '@/types';
import { getStreamByStreamerId } from '@/data/stream';
import { formatViewerCount, formatStreamDuration } from '@/data/stream';
import styles from './FeaturedStream.module.scss';

interface FeaturedStreamProps {
  streamer: Streamer;
}

export default function FeaturedStream({ streamer }: FeaturedStreamProps) {
  const [isClient, setIsClient] = useState(false);
  
  // Avoid hydration mismatch with ReactPlayer
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const stream = getStreamByStreamerId(streamer.id);
  
  if (!stream) {
    return null;
  }
  
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.playerWrapper}>
        {isClient && (
          <ReactPlayer
            url={stream.videoUrl}
            width="100%"
            height="100%"
            playing
            muted
            loop
            controls={false}
            className={styles.reactPlayer}
          />
        )}
        
        <div className={styles.featuredBadge}>
          <span>FEATURED</span>
        </div>
        
        <div className={styles.liveInfo}>
          <div className={styles.liveIndicator}>
            <span className={styles.liveText}>LIVE</span>
          </div>
          <div className={styles.viewerCount}>
            {formatViewerCount(streamer.viewerCount)} viewers
          </div>
          <div className={styles.duration}>
            {streamer.startedAt && formatStreamDuration(streamer.startedAt)}
          </div>
        </div>
      </div>
      
      <div className={styles.infoBar}>
        <Link href={`/stream/${streamer.username}`} className={styles.streamerLink}>
          <div className={styles.streamerInfo}>
            <div className={styles.avatar}>
              <Image
                src={streamer.avatar}
                alt={streamer.displayName}
                width={60}
                height={60}
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.textInfo}>
              <h2 className={styles.title}>{streamer.title}</h2>
              <p className={styles.streamerName}>{streamer.displayName}</p>
              <p className={styles.category}>{streamer.category}</p>
            </div>
          </div>
        </Link>
        
        <div className={styles.tags}>
          {streamer.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        
        <div className={styles.actions}>
          <Link href={`/stream/${streamer.username}`} className={styles.watchButton}>
            Watch Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 