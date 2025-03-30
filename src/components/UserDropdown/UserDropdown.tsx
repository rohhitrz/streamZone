import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './UserDropdown.module.scss';
import { User } from '../../types';

interface UserDropdownProps {
  user: User;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    // For now, just close the dropdown
    setIsOpen(false);
    console.log('Logged out');
  };

  return (
    <div className={styles.userDropdown} ref={dropdownRef}>
      <button className={styles.userButton} onClick={toggleDropdown}>
        <Image 
          src={user.avatar} 
          alt={user.name} 
          width={32} 
          height={32} 
          className={styles.userAvatar}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.dropdownMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.userInfo}>
              <Image 
                src={user.avatar} 
                alt={user.name} 
                width={48} 
                height={48} 
                className={styles.menuAvatar}
              />
              <div className={styles.userDetails}>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userEmail}>{user.email}</div>
              </div>
            </div>
            
            <div className={styles.dropdownItems}>
              <Link href="/profile" className={styles.dropdownItem}>
                <span className={styles.itemIcon}>👤</span>
                My Profile
              </Link>
              <Link href="/settings" className={styles.dropdownItem}>
                <span className={styles.itemIcon}>⚙️</span>
                Settings
              </Link>
              <button className={styles.dropdownItem} onClick={handleLogout}>
                <span className={styles.itemIcon}>🚪</span>
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown; 