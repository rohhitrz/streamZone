'use client';

import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../components/MainLayout';
import StreamerCard from '../../components/StreamerCard';
import { streamers } from '../../data/streamers';
import styles from './page.module.scss';

export default function FollowingPage() {
  const followedStreamers = streamers.filter(streamer => streamer.isFollowing);
  
  return (
    <MainLayout>
      <div className={styles.followingContainer}>
        <h1 className={styles.pageTitle}>Following</h1>
        
        {followedStreamers.length > 0 ? (
          <div className={styles.streamersGrid}>
            <AnimatePresence>
              {followedStreamers.map(streamer => (
                <motion.div
                  key={streamer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={styles.streamerCard}
                >
                  <StreamerCard streamer={streamer} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.emptyState}
          >
            <div className={styles.emptyStateContent}>
              <h2>You&apos;re not following anyone yet</h2>
              <p>Follow your favorite streamers to see them here</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.discoverButton}
                onClick={() => window.location.href = '/'}
              >
                Discover Streamers
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
} 