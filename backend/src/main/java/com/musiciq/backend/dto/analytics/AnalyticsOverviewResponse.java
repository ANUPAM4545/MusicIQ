package com.musiciq.backend.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsOverviewResponse {
    private Long totalAlbums;
    private Long totalUniqueArtists;
    private Long totalGenres;
    private Double averagePersonalRating;
    private TopAlbumDto highestRatedAlbum;
    private Integer recentlyAddedAlbumsCount;

    private List<GenreAnalyticsDto> genreDistribution;
    private List<YearAnalyticsDto> releaseYearDistribution;
    private List<RatingAnalyticsDto> ratingDistribution;

    private List<TopAlbumDto> topRatedAlbums;
    private List<RecentAlbumDto> recentlyAddedAlbums;
}
