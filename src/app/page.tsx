'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import FeaturedStream from '../components/FeaturedStream';
import StreamerCard from '../components/StreamerCard';
import MainLayout from '../components/MainLayout';
import { Streamer } from '../types';
import { getFeaturedStreamer, getLiveStreamers } from '../data/streamers';
import styles from './page.module.scss';

// Extract the component that uses useSearchParams to a separate component
function HomePageContent() {
  const searchParams = useSearchParams();
  const [featuredStreamer, setFeaturedStreamer] = useState<Streamer | null>(null);
  const [liveStreamers, setLiveStreamers] = useState<Streamer[]>([]);
  const [filteredStreamers, setFilteredStreamers] = useState<Streamer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  // Initialize with search param if available
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);
  
  // Listen for header search events
  useEffect(() => {
    const handleHeaderSearch = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSearchQuery(customEvent.detail.query);
    };
    
    window.addEventListener('header-search', handleHeaderSearch);
    
    return () => {
      window.removeEventListener('header-search', handleHeaderSearch);
    };
  }, []);
  
  useEffect(() => {
    setIsClient(true);
    const featured = getFeaturedStreamer();
    setFeaturedStreamer(featured);
    
    const live = getLiveStreamers().filter(streamer => 
      featured ? streamer.id !== featured.id : true
    );
    setLiveStreamers(live);
    setFilteredStreamers(live);
    
    // Periodically update viewer counts to simulate activity
    const interval = setInterval(() => {
      setLiveStreamers(prev => 
        prev.map(streamer => ({
          ...streamer,
          viewerCount: Math.floor(streamer.viewerCount * (0.95 + Math.random() * 0.1))
        }))
      );
      
      if (featuredStreamer) {
        setFeaturedStreamer(prev => {
          if (!prev) return null;
          return {
            ...prev,
            viewerCount: Math.floor(prev.viewerCount * (0.95 + Math.random() * 0.1))
          };
        });
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [featuredStreamer]);
  
  // When featured streamer changes, update live streamers list
  useEffect(() => {
    if (featuredStreamer) {
      const live = getLiveStreamers().filter(streamer => 
        streamer.id !== featuredStreamer.id
      );
      setLiveStreamers(live);
      setFilteredStreamers(live);
    }
  }, [featuredStreamer]);
  
  // Filter streamers based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStreamers(liveStreamers);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = liveStreamers.filter(streamer => 
      streamer.displayName.toLowerCase().includes(query) || 
      streamer.category.toLowerCase().includes(query) ||
      streamer.title.toLowerCase().includes(query) ||
      streamer.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setFilteredStreamers(filtered);
  }, [searchQuery, liveStreamers]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  if (!isClient) {
    return null; // Avoid hydration mismatch
  }
  
  return (
    <MainLayout>
      <div className={styles.container}>
        {!searchQuery && featuredStreamer && (
          <section className={styles.featuredSection}>
            <FeaturedStream streamer={featuredStreamer} />
          </section>
        )}
        
        <section className={styles.liveSection}>
          <div className={styles.sectionHeader}>
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {searchQuery ? 'Search Results' : 'Live Channels'}
            </motion.h2>
            
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search streams..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>
          </div>
          
          {filteredStreamers.length > 0 ? (
            <div className={styles.streamerGrid}>
              {filteredStreamers.map((streamer) => (
                <StreamerCard key={streamer.id} streamer={streamer} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.noResults}
            >
              <p>No streams found matching &quot;{searchQuery}&quot;</p>
              <button 
                className={styles.resetButton}
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </button>
            </motion.div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}

// Wrap with Suspense in the main export
export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
