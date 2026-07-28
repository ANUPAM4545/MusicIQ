import { useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryService } from '@/services/libraryService';
import { queryKeys } from '@/utils/queryKeys';
import { AlbumUpdateRequest, SavedAlbumResponse } from '@/types/library';
import { toast } from 'sonner';

export function useUpdateAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AlbumUpdateRequest }) => 
      libraryService.updateAlbum(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: queryKeys.library });
      await queryClient.cancelQueries({ queryKey: queryKeys.album(id) });

      // Snapshot the previous value
      const previousLibrary = queryClient.getQueryData<SavedAlbumResponse[]>(queryKeys.library);
      const previousAlbum = queryClient.getQueryData<SavedAlbumResponse>(queryKeys.album(id));

      // Optimistically update to the new value
      if (previousLibrary) {
        queryClient.setQueryData<SavedAlbumResponse[]>(queryKeys.library, old => {
          if (!old) return old;
          return old.map(album => 
            album.id === id ? { ...album, ...data } : album
          );
        });
      }
      
      if (previousAlbum) {
        queryClient.setQueryData<SavedAlbumResponse>(queryKeys.album(id), old => {
          if (!old) return old;
          return { ...old, ...data };
        });
      }

      // Return a context object with the snapshotted value
      return { previousLibrary, previousAlbum };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      if (context?.previousLibrary) {
        queryClient.setQueryData(queryKeys.library, context.previousLibrary);
      }
      if (context?.previousAlbum) {
        queryClient.setQueryData(queryKeys.album(newTodo.id), context.previousAlbum);
      }
      toast.error('Failed to update album. Changes have been reverted.');
    },
    // Always refetch after error or success:
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library });
      queryClient.invalidateQueries({ queryKey: queryKeys.album(variables.id) });
    },
    onSuccess: () => {
      toast.success('Album updated successfully');
    }
  });
}
