'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollableFeed from 'react-scrollable-feed';
import { FiSend, FiSmile, FiSettings } from 'react-icons/fi';
import { Streamer, ChatMessage } from '../../types';
import { initialChatMessages, generateRandomChatMessage } from '../../data/chat';
import styles from './ChatBox.module.scss';

interface ChatBoxProps {
  streamer: Streamer;
}

export default function ChatBox({ streamer }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');
  
  useEffect(() => {
    setIsClient(true);
    
    // Get username from localStorage or generate a default one
    const savedUsername = localStorage.getItem('streamzone-username');
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      const defaultUsername = `user${Math.floor(Math.random() * 10000)}`;
      setUsername(defaultUsername);
      localStorage.setItem('streamzone-username', defaultUsername);
    }
    
    // Get user avatar from localStorage or generate a random one
    const savedAvatar = localStorage.getItem('streamzone-user-avatar');
    if (savedAvatar) {
      setUserAvatar(savedAvatar);
    } else {
      // Random avatar using different services for variety
      const avatarServices = [
        `https://i.pravatar.cc/150?u=${Math.random()}`,
        `https://robohash.org/${Math.random()}?set=set4`,
        `https://avatars.dicebear.com/api/human/${Math.random()}.svg`,
        `https://api.multiavatar.com/${Math.random()}.svg`
      ];
      const randomAvatar = avatarServices[Math.floor(Math.random() * avatarServices.length)];
      setUserAvatar(randomAvatar);
      localStorage.setItem('streamzone-user-avatar', randomAvatar);
    }
    
    // Initialize chat with initial messages
    // Simulate chat for this specific streamer
    const initialMessages = initialChatMessages.map(msg => {
      if (msg.isStreamer) {
        return {
          ...msg,
          username: streamer.username,
          displayName: streamer.displayName,
          avatar: streamer.avatar
        };
      }
      // Generate random avatars for all users in initial messages
      const randomUserAvatar = `https://i.pravatar.cc/150?u=${msg.username}${Math.floor(Math.random() * 1000)}`;
      return {
        ...msg,
        avatar: randomUserAvatar
      };
    });
    
    // Check if there are saved messages for this streamer
    const savedMessages = localStorage.getItem(`chat-messages-${streamer.username}`);
    const parsedMessages = savedMessages ? JSON.parse(savedMessages) : initialMessages;
    
    setMessages(parsedMessages);
    
    // Simulate new chat messages coming in
    const interval = setInterval(() => {
      const newRandomMessage = generateRandomChatMessage();
      
      // Add random avatar to the generated message
      const randomAvatar = `https://i.pravatar.cc/150?u=${newRandomMessage.username}${Math.floor(Math.random() * 1000)}`;
      const messageWithAvatar = {
        ...newRandomMessage,
        avatar: randomAvatar
      };
      
      setMessages(prev => {
        const updatedMessages = [...prev, messageWithAvatar].slice(-100); // Keep only last 100 messages
        
        // Save to localStorage
        localStorage.setItem(`chat-messages-${streamer.username}`, JSON.stringify(updatedMessages));
        
        return updatedMessages;
      });
    }, Math.random() * (5000 - 2000) + 2000); // Random interval between 2-5 seconds
    
    return () => clearInterval(interval);
  }, [streamer.username, streamer.displayName, streamer.avatar]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Create new message from user
    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 15),
      userId: 'current-user',
      username,
      displayName: username,
      avatar: userAvatar,
      message: newMessage,
      timestamp: new Date().toISOString(),
      isStreamer: false,
      isModerator: false,
      isSubscriber: Math.random() > 0.5, // Random subscriber status for fun
    };
    
    setMessages(prev => {
      const updatedMessages = [...prev, userMessage].slice(-100);
      
      // Save to localStorage
      localStorage.setItem(`chat-messages-${streamer.username}`, JSON.stringify(updatedMessages));
      
      return updatedMessages;
    });
    
    setNewMessage('');
    
    // Add a streamer response after a delay for interactive feeling (random chance)
    if (Math.random() > 0.7) {
      const responses = [
        `Thanks for the message, ${username}!`,
        `Good point, ${username}!`,
        `Welcome to the stream, ${username}!`,
        `I appreciate that, ${username}!`,
        `Let's go! ${username} with the hype!`
      ];
      
      setTimeout(() => {
        const streamerResponse: ChatMessage = {
          id: Math.random().toString(36).substring(2, 15),
          userId: streamer.username,
          username: streamer.username,
          displayName: streamer.displayName,
          avatar: streamer.avatar,
          message: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toISOString(),
          isStreamer: true,
          isModerator: false,
          isSubscriber: false,
        };
        
        setMessages(prev => {
          const updatedMessages = [...prev, streamerResponse].slice(-100);
          localStorage.setItem(`chat-messages-${streamer.username}`, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      }, 1000 + Math.random() * 2000);
    }
  };
  
  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    localStorage.setItem('streamzone-username', newUsername);
    setIsSettingsOpen(false);
  };
  
  if (!isClient) {
    return null; // Avoid hydration mismatch
  }
  
  return (
    <div className={styles.chatBox}>
      <div className={styles.header}>
        <h3 className={styles.title}>Stream Chat</h3>
        <div className={styles.liveIndicator}>
          <span className={styles.liveIcon}></span>
          LIVE
        </div>
        <button 
          className={styles.settingsButton}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          aria-label="Chat settings"
        >
          <FiSettings />
        </button>
        
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div 
              className={styles.settingsMenu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.settingsContent}>
                <label className={styles.settingsLabel}>
                  Username
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.settingsInput}
                  />
                </label>
                <button 
                  className={styles.saveButton}
                  onClick={() => handleUsernameChange(username)}
                >
                  Save
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className={styles.messagesContainer}>
        <ScrollableFeed className={styles.scrollableFeed}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`${styles.messageWrapper} ${message.userId === 'current-user' ? styles.userMessage : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.message}>
                <div className={styles.avatar}>
                  <Image
                    src={message.avatar}
                    alt={message.displayName}
                    width={24}
                    height={24}
                    className={styles.avatarImage}
                  />
                </div>
                
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <span 
                      className={`
                        ${styles.username} 
                        ${message.isStreamer ? styles.streamer : ''} 
                        ${message.isModerator ? styles.moderator : ''} 
                        ${message.isSubscriber ? styles.subscriber : ''}
                        ${message.userId === 'current-user' ? styles.currentUser : ''}
                      `}
                    >
                      {message.displayName}
                    </span>
                    <span className={styles.timestamp}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={styles.messageText}>{message.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollableFeed>
      </div>
      
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`Chat as ${username}...`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
          ref={inputRef}
        />
        <button 
          type="button" 
          className={styles.emojiButton}
          aria-label="Add emoji"
        >
          <FiSmile />
        </button>
        <button 
          type="submit" 
          className={styles.sendButton}
          disabled={newMessage.trim() === ''}
          aria-label="Send message"
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
} 