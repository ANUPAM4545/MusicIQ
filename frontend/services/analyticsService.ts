import api from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { AnalyticsOverviewResponse } from '@/types/analytics';

const getAnalyticsOverview = async (): Promise<AnalyticsOverviewResponse> => {
  const response = await api.get<ApiResponse<AnalyticsOverviewResponse>>('/analytics/overview');
  return response.data.data;
};

export const analyticsService = {
  getAnalyticsOverview,
};
