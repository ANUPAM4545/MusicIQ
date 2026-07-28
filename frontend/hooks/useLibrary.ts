import { useQuery } from '@tanstack/react-query';
import { libraryService } from '@/services/libraryService';
import { queryKeys } from '@/utils/queryKeys';

export function useLibrary() {
  return useQuery({
    queryKey: queryKeys.library,
    queryFn: () => libraryService.getLibrary(),
    staleTime: 5 * 60 * 1000,
  });
}
