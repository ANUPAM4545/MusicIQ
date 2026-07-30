package com.musiciq.backend.provider.ai;

import com.musiciq.backend.dto.ai.*;
import com.musiciq.backend.dto.analytics.AnalyticsOverviewResponse;
import com.musiciq.backend.dto.analytics.GenreAnalyticsDto;
import com.musiciq.backend.entity.Album;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class RuleBasedInsightGenerator implements InsightGenerator {

    @Override
    public AiInsightsResponse generateInsights(AnalyticsOverviewResponse analytics, List<Album> allAlbums) {
        if (allAlbums.isEmpty()) {
            return new AiInsightsResponse(List.of(), List.of(), CollectionHealthDto.builder()
                    .score(0)
                    .title("Empty Library")
                    .description("Start saving albums to generate insights.")
                    .ratedAlbumsScore(0)
                    .metadataCompletenessScore(0)
                    .genreDiversityScore(0)
                    .artistDiversityScore(0)
                    .collectionActivityScore(0)
                    .build());
        }

        List<InsightCardDto> insights = new ArrayList<>();

        insights.add(generateLibrarySummary(analytics));
        insights.add(generateFavouriteGenre(analytics));
        insights.add(generateFavouriteArtist(allAlbums));
        insights.add(generateListeningDiversity(analytics));
        insights.add(generateRatingBehaviour(analytics, allAlbums));
        insights.add(generateRecentActivity(allAlbums));
        insights.add(generateCollectionAge(allAlbums));
        insights.add(generateRatingConsistency(allAlbums));
        insights.add(generateDiscoveryBehaviour(allAlbums));

        // Filter out nulls (if any rules didn't apply)
        insights.removeIf(Objects::isNull);

        List<RevisitAlbumDto> revisitSuggestions = generateRevisitSuggestions(allAlbums);
        CollectionHealthDto health = generateCollectionHealth(analytics, allAlbums);

        return AiInsightsResponse.builder()
                .insights(insights)
                .revisitSuggestions(revisitSuggestions)
                .collectionHealth(health)
                .build();
    }

    private InsightCardDto generateLibrarySummary(AnalyticsOverviewResponse analytics) {
        String description = String.format("You have built a collection of %d albums across %d artists and %d genres.",
                analytics.getTotalAlbums(), analytics.getTotalUniqueArtists(), analytics.getTotalGenres());

        return InsightCardDto.builder()
                .title("Library Summary")
                .description(description)
                .icon("library")
                .priority("HIGH")
                .category(InsightCategoryDto.SUMMARY)
                .build();
    }

    private InsightCardDto generateFavouriteGenre(AnalyticsOverviewResponse analytics) {
        if (analytics.getGenreDistribution() == null || analytics.getGenreDistribution().isEmpty()) {
            return null;
        }

        GenreAnalyticsDto topGenre = analytics.getGenreDistribution().get(0);
        long percentage = (topGenre.getCount() * 100) / analytics.getTotalAlbums();

        return InsightCardDto.builder()
                .title("Favourite Genre")
                .description(String.format("%s represents %d%% of your library.", topGenre.getGenre(), percentage))
                .icon("music")
                .priority("HIGH")
                .category(InsightCategoryDto.SUMMARY)
                .build();
    }

    private InsightCardDto generateFavouriteArtist(List<Album> allAlbums) {
        Map<String, Long> artistCounts = allAlbums.stream()
                .collect(Collectors.groupingBy(Album::getArtist, Collectors.counting()));

        Optional<Map.Entry<String, Long>> topArtist = artistCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue());

        if (topArtist.isPresent() && topArtist.get().getValue() > 1) {
            return InsightCardDto.builder()
                .title("Favourite Artist")
                .description(String.format("%s appears most frequently with %d saved albums.", 
                        topArtist.get().getKey(), topArtist.get().getValue()))
                .icon("mic")
                .priority("HIGH")
                .category(InsightCategoryDto.SUMMARY)
                .build();
        }
        return null;
    }

    private InsightCardDto generateListeningDiversity(AnalyticsOverviewResponse analytics) {
        double ratio = (double) analytics.getTotalUniqueArtists() / analytics.getTotalAlbums();
        String level;
        String desc;

        if (analytics.getTotalAlbums() < 5) {
            level = "Developing";
            desc = "Keep adding albums to establish your diversity score.";
        } else if (ratio > 0.7) {
            level = "High";
            desc = "You listen to a highly diverse range of artists.";
        } else if (ratio > 0.4) {
            level = "Medium";
            desc = "You have a balanced mix of favourite artists and new discoveries.";
        } else {
            level = "Low";
            desc = "You tend to stick closely to a few favourite artists.";
        }

        return InsightCardDto.builder()
                .title("Listening Diversity")
                .description("Diversity Score: " + level + ". " + desc)
                .icon("bar-chart")
                .priority("MEDIUM")
                .category(InsightCategoryDto.DIVERSITY)
                .build();
    }

    private InsightCardDto generateRatingBehaviour(AnalyticsOverviewResponse analytics, List<Album> allAlbums) {
        long ratedCount = allAlbums.stream().filter(a -> a.getPersonalRating() != null).count();
        if (ratedCount == 0) {
            return InsightCardDto.builder()
                    .title("Rating Behaviour")
                    .description("You rarely rate albums. Try rating them to get better insights!")
                    .icon("star")
                    .priority("LOW")
                    .category(InsightCategoryDto.BEHAVIOUR)
                    .build();
        }

        double avg = analytics.getAveragePersonalRating();
        String desc;
        if (avg >= 4.0) {
            desc = String.format("You consistently rate albums highly with an average rating of %.1f.", avg);
        } else if (avg <= 2.5) {
            desc = String.format("You are a tough critic! Your average rating is %.1f.", avg);
        } else {
            desc = String.format("You have a balanced rating approach with an average rating of %.1f.", avg);
        }

        return InsightCardDto.builder()
                .title("Rating Behaviour")
                .description(desc)
                .icon("star")
                .priority("MEDIUM")
                .category(InsightCategoryDto.BEHAVIOUR)
                .build();
    }

    private InsightCardDto generateRecentActivity(List<Album> allAlbums) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        long recentCount = allAlbums.stream()
                .filter(a -> a.getCreatedAt().isAfter(sevenDaysAgo))
                .count();

        if (recentCount > 0) {
            return InsightCardDto.builder()
                    .title("Recent Activity")
                    .description(String.format("You added %d albums during your latest activity this week.", recentCount))
                    .icon("activity")
                    .priority("MEDIUM")
                    .category(InsightCategoryDto.TREND)
                    .build();
        }
        return null;
    }

    private InsightCardDto generateCollectionAge(List<Album> allAlbums) {
        Album oldest = allAlbums.stream()
                .min(Comparator.comparing(Album::getCreatedAt))
                .orElse(null);

        if (oldest != null) {
            long days = ChronoUnit.DAYS.between(oldest.getCreatedAt(), LocalDateTime.now());
            if (days > 0) {
                return InsightCardDto.builder()
                        .title("Collection Age")
                        .description(String.format("Your oldest saved album has been in your collection for %d days.", days))
                        .icon("clock")
                        .priority("LOW")
                        .category(InsightCategoryDto.TREND)
                        .build();
            }
        }
        return null;
    }

    private InsightCardDto generateRatingConsistency(List<Album> allAlbums) {
        long highRatings = allAlbums.stream()
                .filter(a -> a.getPersonalRating() != null && a.getPersonalRating() >= 4)
                .count();
        long lowRatings = allAlbums.stream()
                .filter(a -> a.getPersonalRating() != null && a.getPersonalRating() <= 2)
                .count();

        if (highRatings > lowRatings && highRatings > 3) {
            return InsightCardDto.builder()
                    .title("Rating Consistency")
                    .description("You tend to rate most albums between 4 and 5 stars.")
                    .icon("trending-up")
                    .priority("LOW")
                    .category(InsightCategoryDto.BEHAVIOUR)
                    .build();
        }
        return null;
    }

    private InsightCardDto generateDiscoveryBehaviour(List<Album> allAlbums) {
        Map<String, Long> artistCounts = allAlbums.stream()
                .collect(Collectors.groupingBy(Album::getArtist, Collectors.counting()));
        
        long totalAlbums = allAlbums.size();
        if (totalAlbums > 5) {
            List<Long> sortedCounts = artistCounts.values().stream()
                    .sorted(Comparator.reverseOrder())
                    .collect(Collectors.toList());
            
            if (sortedCounts.size() >= 2) {
                long topTwoCount = sortedCounts.get(0) + sortedCounts.get(1);
                if (topTwoCount > (totalAlbums * 0.6)) {
                    return InsightCardDto.builder()
                            .title("Discovery Behaviour")
                            .description("Most of your albums belong to only two artists.")
                            .icon("users")
                            .priority("MEDIUM")
                            .category(InsightCategoryDto.BEHAVIOUR)
                            .build();
                }
            }
        }
        return null;
    }

    private List<RevisitAlbumDto> generateRevisitSuggestions(List<Album> allAlbums) {
        List<RevisitAlbumDto> suggestions = new ArrayList<>();
        Set<UUID> added = new HashSet<>();

        // 1. Never Rated
        allAlbums.stream()
                .filter(a -> a.getPersonalRating() == null)
                .findFirst()
                .ifPresent(a -> {
                    suggestions.add(buildRevisitDto(a, "You haven't rated this album yet."));
                    added.add(a.getId());
                });

        // 2. Lowest Rated
        allAlbums.stream()
                .filter(a -> !added.contains(a.getId()) && a.getPersonalRating() != null)
                .min(Comparator.comparing(Album::getPersonalRating))
                .ifPresent(a -> {
                    suggestions.add(buildRevisitDto(a, "One of your lowest rated albums. Worth a second chance?"));
                    added.add(a.getId());
                });

        // 3. Oldest Added
        allAlbums.stream()
                .filter(a -> !added.contains(a.getId()))
                .min(Comparator.comparing(Album::getCreatedAt))
                .ifPresent(a -> {
                    suggestions.add(buildRevisitDto(a, "This is one of the oldest albums in your collection."));
                    added.add(a.getId());
                });

        // 4. Not Updated Recently
        allAlbums.stream()
                .filter(a -> !added.contains(a.getId()))
                .min(Comparator.comparing(Album::getUpdatedAt))
                .ifPresent(a -> {
                    if (suggestions.size() < 5) {
                        suggestions.add(buildRevisitDto(a, "You haven't updated this album's metadata in a while."));
                        added.add(a.getId());
                    }
                });

        return suggestions;
    }

    private RevisitAlbumDto buildRevisitDto(Album a, String reason) {
        return RevisitAlbumDto.builder()
                .title(a.getTitle())
                .artist(a.getArtist())
                .coverArtUrl(a.getCoverArtUrl())
                .reason(reason)
                .build();
    }

    private CollectionHealthDto generateCollectionHealth(AnalyticsOverviewResponse analytics, List<Album> allAlbums) {
        long albumsSaved = analytics.getTotalAlbums();
        long genresCount = analytics.getTotalGenres();
        long artistsCount = analytics.getTotalUniqueArtists();
        
        long ratedCount = allAlbums.stream().filter(a -> a.getPersonalRating() != null).count();
        long withNotesCount = allAlbums.stream().filter(a -> a.getPersonalNotes() != null && !a.getPersonalNotes().trim().isEmpty()).count();
        
        // Rated albums score (Max 20): proportional to % rated, but at least 10 albums expected
        int ratedScore = albumsSaved == 0 ? 0 : Math.min(20, (int) Math.round(((double) ratedCount / Math.max(10, albumsSaved)) * 20));
        
        // Metadata completeness (Max 20): % of albums with notes
        int metadataScore = albumsSaved == 0 ? 0 : Math.min(20, (int) Math.round(((double) withNotesCount / Math.max(5, albumsSaved)) * 20));
        
        // Genre diversity (Max 20): 2 points per genre up to 10
        int genreScore = Math.min(20, (int) (genresCount * 2));
        
        // Artist diversity (Max 20): 1 point per artist up to 20
        int artistScore = Math.min(20, (int) artistsCount);
        
        // Collection activity (Max 20): 1 point per album up to 20
        int activityScore = Math.min(20, (int) albumsSaved);
        
        int totalHealthScore = ratedScore + metadataScore + genreScore + artistScore + activityScore;
        
        String title;
        String description;

        if (albumsSaved < 5) {
            title = "Just Starting";
            description = "Start saving more albums to improve your collection health.";
        } else if (totalHealthScore >= 80) {
            title = "Excellent Health";
            description = "Your collection spans many artists and genres, and you actively rate them.";
        } else if (totalHealthScore >= 50) {
            title = "Average Health";
            description = "Your collection is growing steadily. Try rating more albums and adding notes.";
        } else {
            title = "Needs Improvement";
            description = "You may want to explore more artists and rate your saved albums to diversify your collection.";
        }

        return CollectionHealthDto.builder()
                .score(totalHealthScore)
                .title(title)
                .description(description)
                .ratedAlbumsScore(ratedScore)
                .metadataCompletenessScore(metadataScore)
                .genreDiversityScore(genreScore)
                .artistDiversityScore(artistScore)
                .collectionActivityScore(activityScore)
                .build();
    }
}
