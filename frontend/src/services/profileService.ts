import api from '@/lib/api';
import {
  UserProfile,
  ProfileUpdateRequest,
  ProfileStats,
  Personality,
  Achievement,
  ActivityLog,
} from '@/types/profile';
import { ApiResponse } from '@/types/api';

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<ApiResponse<UserProfile>>('/profile');
    return response.data.data;
  },

  updateProfile: async (request: ProfileUpdateRequest): Promise<UserProfile> => {
    const response = await api.patch<ApiResponse<UserProfile>>('/profile', request);
    return response.data.data;
  },

  getStats: async (): Promise<ProfileStats> => {
    const response = await api.get<ApiResponse<ProfileStats>>('/profile/stats');
    return response.data.data;
  },

  getPersonality: async (): Promise<Personality> => {
    const response = await api.get<ApiResponse<Personality>>('/profile/personality');
    return response.data.data;
  },

  getAchievements: async (): Promise<Achievement[]> => {
    const response = await api.get<ApiResponse<Achievement[]>>('/profile/achievements');
    return response.data.data;
  },

  getActivityTimeline: async (): Promise<ActivityLog[]> => {
    const response = await api.get<ApiResponse<ActivityLog[]>>('/profile/activity');
    return response.data.data;
  },
};
