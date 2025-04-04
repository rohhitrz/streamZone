'use client';

import { useState, useEffect, useRef } from 'react';
import { FiUser, FiHeart, FiShare2, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player/lazy';
import { Streamer, StreamQuality } from '@/types';
import { getStreamByStreamerId, formatViewerCount, formatStreamDuration, streamQualities } from '@/data/stream';
import styles from './StreamPlayer.module.scss';

interface StreamPlayerProps {
  streamer: Streamer;
}

export default function StreamPlayer({ streamer }: StreamPlayerProps) {
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [currentQuality, setCurrentQuality] = useState<StreamQuality>(streamQualities[0]);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  const stream = getStreamByStreamerId(streamer.id);
  
  useEffect(() => {
    setIsClient(true);
    
    // Check if the user has already followed/subscribed from localStorage
    const followedStreamers = localStorage.getItem('followed-streamers') 
      ? JSON.parse(localStorage.getItem('followed-streamers') || '[]') 
      : [];
    
    const subscribedStreamers = localStorage.getItem('subscribed-streamers') 
      ? JSON.parse(localStorage.getItem('subscribed-streamers') || '[]') 
      : [];
    
    setIsFollowing(followedStreamers.includes(streamer.id));
    setIsSubscribed(subscribedStreamers.includes(streamer.id));
    
    // Hide controls after 3 seconds of inactivity
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [streamer.id]);
  
  const handleMouseMove = () => {
    setShowControls(true);
    
    // Hide controls after 3 seconds of inactivity
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleFollow = () => {
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);
    
    // Save to localStorage
    const followedStreamers = localStorage.getItem('followed-streamers') 
      ? JSON.parse(localStorage.getItem('followed-streamers') || '[]') 
      : [];
    
    if (newFollowingState) {
      localStorage.setItem('followed-streamers', JSON.stringify([...followedStreamers, streamer.id]));
    } else {
      localStorage.setItem('followed-streamers', 
        JSON.stringify(followedStreamers.filter((id: string) => id !== streamer.id)));
    }
  };
  
  const toggleSubscribe = () => {
    const newSubscribedState = !isSubscribed;
    setIsSubscribed(newSubscribedState);
    
    // Save to localStorage
    const subscribedStreamers = localStorage.getItem('subscribed-streamers') 
      ? JSON.parse(localStorage.getItem('subscribed-streamers') || '[]') 
      : [];
    
    if (newSubscribedState) {
      localStorage.setItem('subscribed-streamers', JSON.stringify([...subscribedStreamers, streamer.id]));
    } else {
      localStorage.setItem('subscribed-streamers', 
        JSON.stringify(subscribedStreamers.filter((id: string) => id !== streamer.id)));
    }
  };
  
  const handleQualityChange = (quality: StreamQuality) => {
    setCurrentQuality(quality);
    setShowQualityMenu(false);
  };
  
  if (!isClient || !stream) {
    return <div className={styles.loadingContainer}>Loading stream...</div>;
  }
  
  return (
    <div 
      className={styles.playerContainer} 
      onMouseMove={handleMouseMove}
      ref={playerContainerRef}
    >
      <ReactPlayer
        url={stream.videoUrl}
        width="100%"
        height="100%"
        playing={isPlaying}
        muted={isMuted}
        controls={false}
        pip={true}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              showinfo: 0,
              rel: 0,
            },
          },
        }}
        className={styles.reactPlayer}
      />
      
      <div className={styles.actionButtons}>
        <button 
          className={`${styles.actionButton} ${isFollowing ? styles.followed : ''}`}
          onClick={toggleFollow}
          aria-label={isFollowing ? 'Unfollow' : 'Follow'}
        >
          <FiHeart size={16} />
          <span>{isFollowing ? 'Following' : 'Follow'}</span>
        </button>
        
        <button 
          className={`${styles.actionButton} ${styles.subscribeButton} ${isSubscribed ? styles.subscribed : ''}`}
          onClick={toggleSubscribe}
          aria-label={isSubscribed ? 'Subscribed' : 'Subscribe'}
        >
          <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
        </button>
      </div>
      
      <AnimatePresence>
        {showControls && (
          <motion.div 
            className={styles.controls}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.topControls}>
              <div className={styles.streamerInfo}>
                <span className={styles.streamTitle}>{stream.title || streamer.title}</span>
                <span className={styles.streamerName}>{streamer.displayName}</span>
              </div>
              
              <div className={styles.viewerInfo}>
                <FiUser size={16} />
                <span>{formatViewerCount(streamer.viewerCount)}</span>
                {streamer.startedAt && (
                  <span className={styles.duration}>
                    {formatStreamDuration(streamer.startedAt)}
                  </span>
                )}
              </div>
            </div>
            
            <div className={styles.bottomControls}>
              <div className={styles.leftControls}>
                <button 
                  className={styles.controlButton} 
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                
                <button 
                  className={styles.controlButton} 
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                
                <div className={styles.volume}>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    className={styles.volumeSlider} 
                    disabled={isMuted}
                  />
                </div>
              </div>
              
              <div className={styles.rightControls}>
                <div className={styles.qualityControl}>
                  <button 
                    className={styles.controlButton}
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    aria-label="Stream quality settings"
                  >
                    <FiSettings size={16} />
                    <span>{currentQuality.label}</span>
                  </button>
                  
                  <AnimatePresence>
                    {showQualityMenu && (
                      <motion.div 
                        className={styles.qualityMenu}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ul>
                          {streamQualities.map(quality => (
                            <li 
                              key={quality.value} 
                              className={currentQuality.value === quality.value ? styles.active : ''}
                              onClick={() => handleQualityChange(quality)}
                            >
                              {quality.label}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button 
                  className={styles.shareButton}
                  aria-label="Share stream"
                >
                  <FiShare2 size={16} />
                </button>
              </div>
            </div>
            
            <div className={styles.tags}>
              {stream.tags?.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Create a dedicated info bar for language, FPS, category */}
      <div className={styles.playerInfoBar}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ color: 'white' }}>English</span>
          <span style={{ color: 'white' }}>FPS</span>
          {streamer.category && (
            <span style={{ color: 'white' }}>{streamer.category}</span>
          )}
        </div>
        
        <div>
          <span style={{ color: 'white' }}>Auto</span>
        </div>
      </div>
    </div>
  );
} 