'use client';

import React, { useState } from 'react';
import { FiUser, FiBell, FiMonitor, FiLock, FiSave } from 'react-icons/fi';
import MainLayout from '../../components/MainLayout';
import styles from './page.module.scss';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    liveStreams: true,
    followers: true,
    mentions: true,
    subscriptions: false,
    email: false
  });
  
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // In a real application, this would update the theme in a context or local storage
  };
  
  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
    // In a real application, this would save notification preferences
  };

  return (
    <MainLayout>
      <div className={styles.settingsPage}>
        <h1 className={styles.pageTitle}>Settings</h1>
        
        <div className={styles.settingsContainer}>
          <div className={styles.settingsSidebar}>
            <button 
              className={`${styles.sidebarButton} ${activeSection === 'account' ? styles.active : ''}`}
              onClick={() => setActiveSection('account')}
            >
              <FiUser className={styles.buttonIcon} />
              <span>Account</span>
            </button>
            <button 
              className={`${styles.sidebarButton} ${activeSection === 'notifications' ? styles.active : ''}`}
              onClick={() => setActiveSection('notifications')}
            >
              <FiBell className={styles.buttonIcon} />
              <span>Notifications</span>
            </button>
            <button 
              className={`${styles.sidebarButton} ${activeSection === 'appearance' ? styles.active : ''}`}
              onClick={() => setActiveSection('appearance')}
            >
              <FiMonitor className={styles.buttonIcon} />
              <span>Appearance</span>
            </button>
            <button 
              className={`${styles.sidebarButton} ${activeSection === 'security' ? styles.active : ''}`}
              onClick={() => setActiveSection('security')}
            >
              <FiLock className={styles.buttonIcon} />
              <span>Security</span>
            </button>
          </div>
          
          <div className={styles.settingsContent}>
            {activeSection === 'account' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Account Settings</h2>
                
                <form className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.formLabel}>Username</label>
                    <input 
                      type="text" 
                      id="username" 
                      className={styles.formInput} 
                      defaultValue="StreamZone_User"
                    />
                    <p className={styles.formHelp}>Your unique username that appears on your profile.</p>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="displayName" className={styles.formLabel}>Display Name</label>
                    <input 
                      type="text" 
                      id="displayName" 
                      className={styles.formInput} 
                      defaultValue="StreamZone User"
                    />
                    <p className={styles.formHelp}>Your name displayed in chats and on streams.</p>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className={styles.formInput} 
                      defaultValue="user@streamzone.com"
                    />
                    <p className={styles.formHelp}>Email used for account notifications and recovery.</p>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="bio" className={styles.formLabel}>Bio</label>
                    <textarea 
                      id="bio" 
                      className={styles.formTextarea} 
                      defaultValue="Welcome to my StreamZone profile!"
                      rows={4}
                    />
                    <p className={styles.formHelp}>Short description displayed on your profile.</p>
                  </div>
                  
                  <button type="button" className={styles.saveButton}>
                    <FiSave className={styles.buttonIcon} />
                    Save Changes
                  </button>
                </form>
              </div>
            )}
            
            {activeSection === 'notifications' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Notification Settings</h2>
                
                <div className={styles.notificationToggles}>
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationInfo}>
                      <h3 className={styles.notificationTitle}>Live Streams</h3>
                      <p className={styles.notificationDescription}>Get notified when channels you follow go live</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notifications.liveStreams} 
                        onChange={() => handleNotificationChange('liveStreams')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationInfo}>
                      <h3 className={styles.notificationTitle}>New Followers</h3>
                      <p className={styles.notificationDescription}>Get notified when someone follows your channel</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notifications.followers} 
                        onChange={() => handleNotificationChange('followers')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationInfo}>
                      <h3 className={styles.notificationTitle}>Mentions</h3>
                      <p className={styles.notificationDescription}>Get notified when someone mentions you in chat</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notifications.mentions} 
                        onChange={() => handleNotificationChange('mentions')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationInfo}>
                      <h3 className={styles.notificationTitle}>Subscriptions</h3>
                      <p className={styles.notificationDescription}>Get notified for new subscriptions to your channel</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notifications.subscriptions} 
                        onChange={() => handleNotificationChange('subscriptions')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationInfo}>
                      <h3 className={styles.notificationTitle}>Email Notifications</h3>
                      <p className={styles.notificationDescription}>Receive important updates via email</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notifications.email} 
                        onChange={() => handleNotificationChange('email')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
                
                <button type="button" className={styles.saveButton}>
                  <FiSave className={styles.buttonIcon} />
                  Save Preferences
                </button>
              </div>
            )}
            
            {activeSection === 'appearance' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Appearance Settings</h2>
                
                <div className={styles.appearanceOptions}>
                  <div className={styles.themeOption}>
                    <div className={styles.themeInfo}>
                      <h3 className={styles.themeTitle}>Dark Mode</h3>
                      <p className={styles.themeDescription}>Toggle between dark and light mode</p>
                    </div>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={handleDarkModeToggle}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  
                  <div className={styles.themePreview}>
                    <div className={`${styles.previewCard} ${darkMode ? styles.dark : styles.light}`}>
                      <div className={styles.previewHeader}></div>
                      <div className={styles.previewContent}>
                        <div className={styles.previewLine}></div>
                        <div className={styles.previewLine}></div>
                        <div className={styles.previewLine}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button type="button" className={styles.saveButton}>
                  <FiSave className={styles.buttonIcon} />
                  Save Theme
                </button>
              </div>
            )}
            
            {activeSection === 'security' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Security Settings</h2>
                
                <form className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="currentPassword" className={styles.formLabel}>Current Password</label>
                    <input 
                      type="password" 
                      id="currentPassword" 
                      className={styles.formInput} 
                      placeholder="Enter your current password"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="newPassword" className={styles.formLabel}>New Password</label>
                    <input 
                      type="password" 
                      id="newPassword" 
                      className={styles.formInput} 
                      placeholder="Enter a new password"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      className={styles.formInput} 
                      placeholder="Confirm your new password"
                    />
                  </div>
                  
                  <div className={styles.securityOptions}>
                    <h3 className={styles.subSectionTitle}>Two-Factor Authentication</h3>
                    <p className={styles.securityDescription}>
                      Two-factor authentication adds an additional layer of security to your account 
                      by requiring more than just a password to sign in.
                    </p>
                    <button type="button" className={styles.secondaryButton}>
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                  
                  <button type="button" className={styles.saveButton}>
                    <FiSave className={styles.buttonIcon} />
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 