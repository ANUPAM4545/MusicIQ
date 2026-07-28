package com.musiciq.backend.provider.ai;

import com.musiciq.backend.dto.ai.AiInsightsResponse;
import com.musiciq.backend.dto.analytics.AnalyticsOverviewResponse;
import com.musiciq.backend.entity.Album;

import java.util.List;

public interface InsightGenerator {
    AiInsightsResponse generateInsights(AnalyticsOverviewResponse analytics, List<Album> allAlbums);
}
