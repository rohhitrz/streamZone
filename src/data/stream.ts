import { Stream, StreamQuality } from '../types';

export const streams: Stream[] = [
  {
    id: '1',
    streamerId: '1',
    title: 'New Season Gameplay! || !prime !merch',
    category: 'Fortnite',
    tags: ['English', 'FPS', 'Competitive'],
    thumbnailUrl: '/thumbnails/fortnite-stream.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', // Lofi music for testing (non-copyrighted content)
    startedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    viewerCount: 23541,
  },
  {
    id: '2',
    streamerId: '2',
    title: 'Chatting with viewers! !socials !donate',
    category: 'Just Chatting',
    tags: ['English', 'IRL', 'Variety'],
    thumbnailUrl: '/thumbnails/just-chatting.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A', // Lofi music for testing (non-copyrighted content)
    startedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    viewerCount: 18762,
  },
  {
    id: '3',
    streamerId: '3',
    title: 'RANKED GRIND | !discord !prime',
    category: 'Valorant',
    tags: ['English', 'FPS', 'Ranked'],
    thumbnailUrl: '/thumbnails/valorant-stream.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=21qNxnCS8WU', // Lofi music for testing (non-copyrighted content)
    startedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    viewerCount: 32104,
  },
  {
    id: '4',
    streamerId: '4',
    title: 'SPEEDRUNNING NEW RECORD TODAY PogU',
    category: 'Minecraft',
    tags: ['English', 'Speedrun', 'Competitive'],
    thumbnailUrl: '/thumbnails/minecraft-stream.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=lTRiuFIWV54', // Lofi music for testing (non-copyrighted content)
    startedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    viewerCount: 78432,
  },
  {
    id: '5',
    streamerId: '5',
    title: 'ASMR & Chill ✨ !socials !sub',
    category: 'ASMR',
    tags: ['English', 'ASMR', 'IRL'],
    thumbnailUrl: '/thumbnails/asmr-stream.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=DWcJFNfaw9c', // Lofi music for testing (non-copyrighted content)
    startedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    viewerCount: 12683,
  },
  {
    id: '6',
    streamerId: '6',
    title: 'WARZONE WITH THE BOYS | !youtube !merch',
    category: 'Call of Duty: Warzone',
    tags: ['English', 'FPS', 'Battle Royale'],
    thumbnailUrl: '/thumbnails/warzone-stream.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=QhBnZ6NPOY0', // Lofi music for testing (non-copyrighted content)
    startedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    viewerCount: 41298,
  },
];

export const streamQualities: StreamQuality[] = [
  { label: 'Auto', value: 'auto' },
  { label: '1080p60 (Source)', value: '1080p60' },
  { label: '720p60', value: '720p60' },
  { label: '480p30', value: '480p30' },
  { label: '360p30', value: '360p30' },
  { label: '160p30', value: '160p30' },
];

export const getStreamByStreamerId = (streamerId: string): Stream | undefined => {
  return streams.find(stream => stream.streamerId === streamerId);
};

export const formatViewerCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  } else {
    return count.toString();
  }
};

export const formatStreamDuration = (startedAt: string): string => {
  const startTime = new Date(startedAt).getTime();
  const currentTime = Date.now();
  const durationMs = currentTime - startTime;
  
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}; 