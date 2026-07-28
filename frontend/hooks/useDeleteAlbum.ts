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
      queryClient.setQueryData(queryKeys.library, (old: any) => {
        if (!old) return old;
        return old.filter((album: any) => album.id !== deletedId);
      });
      // Invalidate just in case
      queryClient.invalidateQueries({ queryKey: queryKeys.library });
      toast.success('Album removed from library');
    },
    onError: () => {
      toast.error('Failed to remove album');
    }
  });
}
