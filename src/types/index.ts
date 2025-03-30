export interface Streamer {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bannerImage: string;
  category: string;
  title: string;
  tags: string[];
  isLive: boolean;
  viewerCount: number;
  startedAt?: string;
  thumbnailUrl: string;
  isFollowing?: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  message: string;
  timestamp: string;
  isStreamer: boolean;
  isModerator: boolean;
  isSubscriber: boolean;
}

export type UserRole = 'viewer' | 'moderator' | 'streamer';

export interface User {
  id: string;
  username: string;
  displayName: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  isSubscriber: boolean;
  isFollowing?: boolean[];
}

export interface Stream {
  id: string;
  streamerId: string;
  title: string;
  category: string;
  tags: string[];
  thumbnailUrl: string;
  videoUrl: string;
  startedAt: string;
  viewerCount: number;
}

export type ThemeMode = 'dark' | 'light';

export interface StreamQuality {
  label: string;
  value: string;
} 