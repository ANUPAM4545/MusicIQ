package com.musiciq.backend.service;

import com.musiciq.backend.dto.ai.AiInsightsResponse;
import com.musiciq.backend.dto.ai.CollectionHealthDto;
import com.musiciq.backend.dto.analytics.AnalyticsOverviewResponse;
import com.musiciq.backend.entity.Album;
import com.musiciq.backend.entity.User;
import com.musiciq.backend.exception.ResourceNotFoundException;
import com.musiciq.backend.provider.ai.InsightGenerator;
import com.musiciq.backend.repository.AlbumRepository;
import com.musiciq.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiInsightsService {

    private final UserRepository userRepository;
    private final AlbumRepository albumRepository;
    private final AnalyticsService analyticsService;
    private final InsightGenerator insightGenerator;

    @Transactional(readOnly = true)
    public AiInsightsResponse getInsights(String userEmail) {
        long startTime = System.currentTimeMillis();
        log.info("User {} requesting AI insights", userEmail);

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        AnalyticsOverviewResponse analytics = analyticsService.getAnalyticsOverview(userEmail);

        if (analytics.getTotalAlbums() == 0) {
            log.info("User {} has no albums. Returning empty insights.", user.getId());
            return new AiInsightsResponse(
                    List.of(),
                    List.of(),
                    new CollectionHealthDto(0, "Empty Library", "Start saving albums to generate insights.")
            );
        }

        List<Album> allAlbums = albumRepository.findByUser_Id(user.getId());
        log.info("Analysed {} albums for user {}", allAlbums.size(), user.getId());

        AiInsightsResponse response = insightGenerator.generateInsights(analytics, allAlbums);

        long executionTime = System.currentTimeMillis() - startTime;
        log.info("Insights generated successfully for user {}. Generated {} insights. Execution time: {} ms",
                user.getId(), response.getInsights().size(), executionTime);

        return response;
    }
}
