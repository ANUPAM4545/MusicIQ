import { useMutation, useQueryClient } from '@tanstack/react-query';
import { albumService } from '@/services/albumService';
import { queryKeys } from '@/utils/queryKeys';
import { AlbumCreateRequest } from '@/types/album';

export function useSaveAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AlbumCreateRequest) => albumService.saveAlbum(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics });
      queryClient.invalidateQueries({ queryKey: queryKeys.insights });
      queryClient.invalidateQueries({ queryKey: ['profile-stats'] });
      queryClient.invalidateQueries({ queryKey: ['profile-activity'] });
      queryClient.invalidateQueries({ queryKey: ['profile-achievements'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
