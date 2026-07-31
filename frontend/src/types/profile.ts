export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string | null;
  bio: string | null;
  avatarUrl: string | null;
  country: string | null;
  timezone: string | null;
  language: string | null;
  favoriteGenre: string | null;
  favoriteArtist: string | null;
  theme: string | null;
  phoneNumber: string | null;
  createdAt: string;
  lastLogin: string | null;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  username?: string;
  bio?: string;
  country?: string;
  timezone?: string;
  language?: string;
  favoriteGenre?: string;
  favoriteArtist?: string;
  theme?: string;
  phoneNumber?: string;
}

export interface ProfileStats {
  albumsSaved: number;
  artistsCount: number;
  genresCount: number;
  averageRating: number;
  collectionHealth: number;
  diversityScore: number;
  aiInsightCount: number;
}

export interface Personality {
  title: string;
  description: string;
  icon: string;
  confidence: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress: number;
  maxProgress: number;
}

export interface ActivityLog {
  id: string;
  actionType: string;
  description: string;
  timestamp: string;
}
