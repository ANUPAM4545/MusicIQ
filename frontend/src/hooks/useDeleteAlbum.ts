import { useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryService } from '@/services/libraryService';
import { queryKeys } from '@/utils/queryKeys';
import { toast } from 'sonner';

export function useDeleteAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => libraryService.deleteAlbum(id),
    onSuccess: (_, deletedId) => {
      // Optimistically remove from library
      queryClient.setQueryData(queryKeys.library, (old: { id: string }[] | undefined) => {
        if (!old) return old;
        return old.filter((album) => album.id !== deletedId);
      });
      // Invalidate just in case
      queryClient.invalidateQueries({ queryKey: queryKeys.library });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics });
      queryClient.invalidateQueries({ queryKey: queryKeys.insights });
      queryClient.invalidateQueries({ queryKey: ['profile-stats'] });
      queryClient.invalidateQueries({ queryKey: ['profile-activity'] });
      queryClient.invalidateQueries({ queryKey: ['profile-achievements'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Album removed from library');
    },
    onError: () => {
      toast.error('Failed to remove album');
    }
  });
}
