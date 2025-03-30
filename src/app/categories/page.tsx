'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../components/MainLayout';
import StreamerCard from '../../components/StreamerCard';
import CategoryTabs from '../../components/CategoryTabs';
import { streamers } from '../../data/streamers';
import { categories } from '../../data/categories';
import styles from './page.module.scss';

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredStreamers, setFilteredStreamers] = useState(streamers);
  
  useEffect(() => {
    // Filter streamers based on selected category
    if (activeCategory === 'All') {
      setFilteredStreamers(streamers);
    } else {
      const filtered = streamers.filter(streamer => 
        streamer.tags.includes(activeCategory) || streamer.category === activeCategory
      );
      setFilteredStreamers(filtered);
    }
  }, [activeCategory]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  return (
    <MainLayout>
      <div className={styles.categoriesContainer}>
        <h1 className={styles.pageTitle}>Browse Categories</h1>
        
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onChange={handleCategoryChange} 
        />
        
        {filteredStreamers.length > 0 ? (
          <div className={styles.streamersGrid}>
            <AnimatePresence>
              {filteredStreamers.map(streamer => (
                <motion.div
                  key={streamer.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
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
            className={styles.noResults}
          >
            <p>No streamers found for this category.</p>
            <button 
              className={styles.resetButton}
              onClick={() => setActiveCategory('All')}
            >
              View all categories
            </button>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
} 