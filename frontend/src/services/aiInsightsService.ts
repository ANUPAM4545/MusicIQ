import api from '@/lib/api';
import { AiInsightsResponse } from '@/types/insights';
import { ApiResponse } from '@/types/api';

export const aiInsightsService = {
  getInsights: async (): Promise<AiInsightsResponse> => {
    const response = await api.get<ApiResponse<AiInsightsResponse>>('/ai/insights');
    return response.data.data;
  },
};
