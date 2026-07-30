import axios from 'axios';
import {
  UserProfile,
  ProfileUpdateRequest,
  ProfileStats,
  Personality,
  Achievement,
  ActivityLog,
} from '@/types/profile';

const API_URL = 'http://localhost:8080/api/profile';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data.data;
  },

  updateProfile: async (request: ProfileUpdateRequest): Promise<UserProfile> => {
    const response = await axios.put(API_URL, request, getAuthHeaders());
    return response.data.data;
  },

  getStats: async (): Promise<ProfileStats> => {
    const response = await axios.get(`${API_URL}/stats`, getAuthHeaders());
    return response.data.data;
  },

  getPersonality: async (): Promise<Personality> => {
    const response = await axios.get(`${API_URL}/personality`, getAuthHeaders());
    return response.data.data;
  },

  getAchievements: async (): Promise<Achievement[]> => {
    const response = await axios.get(`${API_URL}/achievements`, getAuthHeaders());
    return response.data.data;
  },

  getActivityTimeline: async (): Promise<ActivityLog[]> => {
    const response = await axios.get(`${API_URL}/activity`, getAuthHeaders());
    return response.data.data;
  },
};
