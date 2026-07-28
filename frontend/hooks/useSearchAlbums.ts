import { useQuery } from '@tanstack/react-query';
import { albumService } from '@/services/albumService';
import { queryKeys } from '@/utils/queryKeys';

export function useSearchAlbums(term: string) {
  const trimmedTerm = term.trim();
  
  return useQuery({
    queryKey: queryKeys.search(trimmedTerm),
    queryFn: () => albumService.searchAlbums(trimmedTerm),
    enabled: trimmedTerm.length > 0, // Only fetch if we have a term
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in garbage collection cache for 30 minutes
  });
}
