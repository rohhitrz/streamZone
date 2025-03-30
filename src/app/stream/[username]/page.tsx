'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../../components/Layout';
import StreamPlayer from '../../../components/StreamPlayer';
import ChatBox from '../../../components/ChatBox';
import { Streamer } from '../../../types';
import { streamers } from '../../../data/streamers';
import styles from './page.module.scss';

export default function StreamPage() {
  const { username } = useParams<{ username: string }>();
  const [streamer, setStreamer] = useState<Streamer | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const foundStreamer = streamers.find(s => s.username === username);
    setStreamer(foundStreamer || null);
  }, [username]);
  
  if (!isClient) {
    return null;
  }
  
  if (!streamer) {
    return (
      <MainLayout>
        <div className={styles.notFound}>
          <h1>Stream Not Found</h1>
          <p>The streamer you&apos;re looking for doesn&apos;t exist or is not currently streaming.</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className={styles.streamPage}>
        <div className={styles.streamContainer}>
          <StreamPlayer streamer={streamer} />
        </div>
        <div className={styles.chatContainer}>
          <ChatBox streamer={streamer} />
        </div>
      </div>
    </MainLayout>
  );
} 