package com.musiciq.backend.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileStatsResponse {
    private int albumsSaved;
    private int artistsCount;
    private int genresCount;
    private double averageRating;
    private int collectionHealth;
    private int diversityScore;
    private int aiInsightCount;
}
