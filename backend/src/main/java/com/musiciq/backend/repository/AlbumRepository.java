package com.musiciq.backend.repository;

import com.musiciq.backend.entity.Album;
import com.musiciq.backend.dto.analytics.GenreAnalyticsDto;
import com.musiciq.backend.dto.analytics.RatingAnalyticsDto;
import com.musiciq.backend.dto.analytics.YearAnalyticsDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AlbumRepository extends JpaRepository<Album, UUID> {
    List<Album> findByUser_Id(UUID userId);
    List<Album> findByUser_IdOrderByCreatedAtDesc(UUID userId);
    Optional<Album> findByIdAndUser_Id(UUID id, UUID userId);
    boolean existsByItunesIdAndUser_Id(String itunesId, UUID userId);

    long countByUser_Id(UUID userId);

    @Query("SELECT COUNT(DISTINCT a.artist) FROM Album a WHERE a.user.id = :userId")
    long countDistinctArtistByUser_Id(@Param("userId") UUID userId);

    @Query("SELECT COUNT(DISTINCT a.genre) FROM Album a WHERE a.user.id = :userId")
    long countDistinctGenreByUser_Id(@Param("userId") UUID userId);

    @Query("SELECT AVG(a.personalRating) FROM Album a WHERE a.user.id = :userId")
    Double findAverageRatingByUser_Id(@Param("userId") UUID userId);

    @Query("SELECT new com.musiciq.backend.dto.analytics.GenreAnalyticsDto(a.genre, COUNT(a)) " +
           "FROM Album a WHERE a.user.id = :userId GROUP BY a.genre ORDER BY COUNT(a) DESC")
    List<GenreAnalyticsDto> findGenreDistribution(@Param("userId") UUID userId);

    @Query("SELECT new com.musiciq.backend.dto.analytics.YearAnalyticsDto(SUBSTRING(a.releaseDate, 1, 4), COUNT(a)) " +
           "FROM Album a WHERE a.user.id = :userId AND a.releaseDate IS NOT NULL GROUP BY SUBSTRING(a.releaseDate, 1, 4) ORDER BY SUBSTRING(a.releaseDate, 1, 4) ASC")
    List<YearAnalyticsDto> findReleaseYearDistribution(@Param("userId") UUID userId);

    @Query("SELECT new com.musiciq.backend.dto.analytics.RatingAnalyticsDto(a.personalRating, COUNT(a)) " +
           "FROM Album a WHERE a.user.id = :userId AND a.personalRating IS NOT NULL GROUP BY a.personalRating ORDER BY a.personalRating DESC")
    List<RatingAnalyticsDto> findRatingDistribution(@Param("userId") UUID userId);

    @Query("SELECT a FROM Album a WHERE a.user.id = :userId AND a.personalRating IS NOT NULL ORDER BY a.personalRating DESC, a.createdAt DESC")
    List<Album> findTopRatedAlbums(@Param("userId") UUID userId, Pageable pageable);

    @Query("SELECT a FROM Album a WHERE a.user.id = :userId ORDER BY a.createdAt DESC")
    List<Album> findRecentlyAddedAlbums(@Param("userId") UUID userId, Pageable pageable);
}
