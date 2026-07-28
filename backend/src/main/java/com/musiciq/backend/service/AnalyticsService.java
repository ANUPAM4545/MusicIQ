package com.musiciq.backend.service;

import com.musiciq.backend.dto.analytics.*;
import com.musiciq.backend.entity.Album;
import com.musiciq.backend.entity.User;
import com.musiciq.backend.exception.ResourceNotFoundException;
import com.musiciq.backend.repository.AlbumRepository;
import com.musiciq.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AlbumRepository albumRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public AnalyticsOverviewResponse getAnalyticsOverview(String userEmail) {
        long startTime = System.currentTimeMillis();
        log.info("Analytics request received for user: {}", userEmail);

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        long totalAlbums = albumRepository.countByUser_Id(user.getId());

        if (totalAlbums == 0) {
            log.info("User {} has no albums. Returning empty analytics response.", user.getId());
            return AnalyticsOverviewResponse.builder()
                    .totalAlbums(0L)
                    .totalUniqueArtists(0L)
                    .totalGenres(0L)
                    .averagePersonalRating(0.0)
                    .highestRatedAlbum(null)
                    .recentlyAddedAlbumsCount(0)
                    .genreDistribution(List.of())
                    .releaseYearDistribution(List.of())
                    .ratingDistribution(List.of())
                    .topRatedAlbums(List.of())
                    .recentlyAddedAlbums(List.of())
                    .build();
        }

        long totalArtists = albumRepository.countDistinctArtistByUser_Id(user.getId());
        long totalGenres = albumRepository.countDistinctGenreByUser_Id(user.getId());
        Double averageRating = albumRepository.findAverageRatingByUser_Id(user.getId());
        if (averageRating == null) {
            averageRating = 0.0;
        }

        List<GenreAnalyticsDto> genreDistribution = albumRepository.findGenreDistribution(user.getId());
        List<YearAnalyticsDto> releaseYearDistribution = albumRepository.findReleaseYearDistribution(user.getId());
        List<RatingAnalyticsDto> ratingDistribution = albumRepository.findRatingDistribution(user.getId());

        List<Album> topAlbums = albumRepository.findTopRatedAlbums(user.getId(), PageRequest.of(0, 5));
        List<Album> recentAlbums = albumRepository.findRecentlyAddedAlbums(user.getId(), PageRequest.of(0, 5));

        List<TopAlbumDto> topAlbumDtos = topAlbums.stream()
                .map(a -> TopAlbumDto.builder()
                        .title(a.getTitle())
                        .artist(a.getArtist())
                        .rating(a.getPersonalRating())
                        .coverArtUrl(a.getCoverArtUrl())
                        .build())
                .collect(Collectors.toList());

        List<RecentAlbumDto> recentAlbumDtos = recentAlbums.stream()
                .map(a -> RecentAlbumDto.builder()
                        .title(a.getTitle())
                        .artist(a.getArtist())
                        .coverArtUrl(a.getCoverArtUrl())
                        .addedDate(a.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        TopAlbumDto highestRatedAlbum = topAlbumDtos.isEmpty() ? null : topAlbumDtos.get(0);

        long executionTime = System.currentTimeMillis() - startTime;
        log.info("Analytics processing completed for user: {}. Execution time: {} ms", user.getId(), executionTime);

        return AnalyticsOverviewResponse.builder()
                .totalAlbums(totalAlbums)
                .totalUniqueArtists(totalArtists)
                .totalGenres(totalGenres)
                .averagePersonalRating(Math.round(averageRating * 100.0) / 100.0)
                .highestRatedAlbum(highestRatedAlbum)
                .recentlyAddedAlbumsCount(recentAlbumDtos.size())
                .genreDistribution(genreDistribution)
                .releaseYearDistribution(releaseYearDistribution)
                .ratingDistribution(ratingDistribution)
                .topRatedAlbums(topAlbumDtos)
                .recentlyAddedAlbums(recentAlbumDtos)
                .build();
    }
}
