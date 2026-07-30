import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profileService';
import { ProfileUpdateRequest } from '@/types/profile';
import { toast } from 'sonner';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  });
};

export const useProfileStats = () => {
  return useQuery({
    queryKey: ['profile-stats'],
    queryFn: profileService.getStats,
  });
};

export const useListeningPersonality = () => {
  return useQuery({
    queryKey: ['profile-personality'],
    queryFn: profileService.getPersonality,
  });
};

export const useProfileAchievements = () => {
  return useQuery({
    queryKey: ['profile-achievements'],
    queryFn: profileService.getAchievements,
  });
};

export const useActivityTimeline = () => {
  return useQuery({
    queryKey: ['profile-activity'],
    queryFn: profileService.getActivityTimeline,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ProfileUpdateRequest) => profileService.updateProfile(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile-activity'] });
      toast.success('Profile updated successfully');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });
};
