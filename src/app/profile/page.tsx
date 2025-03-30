'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiEdit2, FiUser, FiVideo, FiClock, FiSettings, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import MainLayout from '../../components/MainLayout';
import styles from './page.module.scss';

// Use default user data since we don't have actual authentication
const initialUser = {
  name: 'StreamZone User',
  email: 'user@streamzone.com',
  avatar: 'https://i.pravatar.cc/150?u=streamzone_user',
  bio: "Welcome to my StreamZone profile! I'm new to the platform and excited to engage with the community."
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(initialUser);
  const [formData, setFormData] = useState({...initialUser});
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [savingChanges, setSavingChanges] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({...formData, [id]: value});
  };
  
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingChanges(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setUser({...formData});
      setSavingChanges(false);
      showToast('Changes saved successfully!', 'success');
      
      // Store changes in localStorage
      localStorage.setItem('streamzone-user-profile', JSON.stringify(formData));
    }, 800);
  };
  
  const handleEditAbout = () => {
    setIsEditing(true);
    setActiveTab('settings');
  };
  
  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };
  
  return (
    <MainLayout>
      <div className={styles.profilePage}>
        {toast.show && (
          <div className={`${styles.toast} ${styles[toast.type]}`}>
            <FiCheck className={styles.toastIcon} />
            {toast.message}
          </div>
        )}
        
        <div className={styles.profileHeader}>
          <div className={styles.profileAvatar}>
            <Image 
              src={user.avatar}
              alt={user.name}
              width={100}
              height={100}
              className={styles.avatarImage}
            />
            <button className={styles.editAvatarButton}>
              <FiEdit2 />
            </button>
          </div>
          
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>{user.name}</h1>
            <p className={styles.profileEmail}>{user.email}</p>
            <div className={styles.profileStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>0</span>
                <span className={styles.statLabel}>Followers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>5</span>
                <span className={styles.statLabel}>Following</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>0</span>
                <span className={styles.statLabel}>Subscribers</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.profileNavigation}>
          <button 
            className={`${styles.navButton} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FiUser />
            <span>Overview</span>
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'videos' ? styles.active : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <FiVideo />
            <span>Videos</span>
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'activity' ? styles.active : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <FiClock />
            <span>Activity</span>
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings />
            <span>Settings</span>
          </button>
        </div>
        
        <div className={styles.profileContent}>
          {activeTab === 'overview' && (
            <div className={styles.overviewTab}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>About Me</h3>
                <p className={styles.aboutText}>{user.bio}</p>
                <button className={styles.editButton} onClick={handleEditAbout}>Edit</button>
              </div>
              
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Recent Streams</h3>
                <p className={styles.emptyMessage}>You haven&apos;t streamed yet.</p>
                <Link href="#" className={styles.startStreamButton}>Start Streaming</Link>
              </div>
            </div>
          )}
          
          {activeTab === 'videos' && (
            <div className={styles.videosTab}>
              <p className={styles.emptyMessage}>No videos found.</p>
            </div>
          )}
          
          {activeTab === 'activity' && (
            <div className={styles.activityTab}>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <FiUser />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>You followed <strong>Ninja</strong></p>
                    <span className={styles.activityTime}>Just now</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <FiUser />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>You followed <strong>Pokimane</strong></p>
                    <span className={styles.activityTime}>5 minutes ago</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <FiUser />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>You created your account</p>
                    <span className={styles.activityTime}>10 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className={styles.settingsTab}>
              <form className={styles.settingsForm} onSubmit={handleSaveChanges}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Display Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={styles.formInput} 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={styles.formInput} 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="bio" className={styles.formLabel}>Bio</label>
                  <textarea 
                    id="bio" 
                    className={styles.formTextarea} 
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    type="submit" 
                    className={`${styles.saveButton} ${savingChanges ? styles.saving : ''}`}
                    disabled={savingChanges}
                  >
                    {savingChanges ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 