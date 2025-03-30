'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiMenu, FiX, FiSearch, FiMoon, FiSun } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeProvider';
import UserDropdown from '../UserDropdown';
import { currentUser } from '../../data/user';
import styles from './Header.module.scss';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // If on home page, use state to filter (handled in page.tsx)
      // Otherwise navigate to home with search query
      if (pathname !== '/') {
        router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      } else {
        // The search is handled directly in the Home page component
        console.log('Searching for:', searchQuery);
        
        // Create a custom event to notify the Home page about the search
        const searchEvent = new CustomEvent('header-search', { 
          detail: { query: searchQuery } 
        });
        window.dispatchEvent(searchEvent);
      }
    }
  };
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>StreamZone</span>
          </Link>
          
          <nav className={styles.desktopNav}>
            <Link 
              href="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className={`${styles.navLink} ${isActive('/categories') ? styles.active : ''}`}
            >
              Categories
            </Link>
            <Link 
              href="/following" 
              className={`${styles.navLink} ${isActive('/following') ? styles.active : ''}`}
            >
              Following
            </Link>
          </nav>
        </div>
        
        <div className={styles.searchWrapper}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <FiSearch />
            </button>
          </form>
        </div>
        
        <div className={styles.actions}>
          <button 
            onClick={toggleTheme} 
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          
          <UserDropdown user={currentUser} />
          
          <button className={styles.menuButton} onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className={styles.mobileNav}>
              <Link 
                href="/" 
                className={`${styles.mobileNavLink} ${isActive('/') ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className={`${styles.mobileNavLink} ${isActive('/categories') ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/following" 
                className={`${styles.mobileNavLink} ${isActive('/following') ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Following
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 