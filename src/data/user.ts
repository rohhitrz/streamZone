import { User } from '../types';

export const currentUser: User = {
  id: 'current-user',
  username: 'streamzone_user',
  displayName: 'StreamZone User',
  name: 'StreamZone User',
  email: 'user@streamzone.com',
  avatar: 'https://i.pravatar.cc/150?u=streamzone_user',
  role: 'viewer',
  isSubscriber: true,
  isFollowing: [true, false, true, false, true]
}; 