import { useQuery } from '@tanstack/react-query';
import { aiInsightsService } from '@/services/aiInsightsService';
import { queryKeys } from '@/utils/queryKeys';

export function useAiInsights() {
  return useQuery({
    queryKey: queryKeys.insights,
    queryFn: aiInsightsService.getInsights,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error: unknown) => {
      // Don't retry on 401/403/404, only retry transient network errors
      const err = error as { response?: { status?: number } };
      if (err?.response?.status && [401, 403, 404].includes(err.response.status)) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
