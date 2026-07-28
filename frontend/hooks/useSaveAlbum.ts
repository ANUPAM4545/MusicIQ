import { useMutation, useQueryClient } from '@tanstack/react-query';
import { albumService } from '@/services/albumService';
import { queryKeys } from '@/utils/queryKeys';
import { AlbumCreateRequest } from '@/types/album';

export function useSaveAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AlbumCreateRequest) => albumService.saveAlbum(data),
    onSuccess: () => {
      // Invalidate the library query so it fetches fresh data when navigated to
      queryClient.invalidateQueries({ queryKey: queryKeys.library });
    },
  });
}
