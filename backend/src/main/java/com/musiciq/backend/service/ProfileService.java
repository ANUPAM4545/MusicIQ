package com.musiciq.backend.service;

import com.musiciq.backend.dto.profile.*;
import com.musiciq.backend.entity.ActivityLog;
import com.musiciq.backend.entity.Album;
import com.musiciq.backend.entity.User;
import com.musiciq.backend.exception.ResourceNotFoundException;
import com.musiciq.backend.repository.ActivityLogRepository;
import com.musiciq.backend.repository.AlbumRepository;
import com.musiciq.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final AlbumRepository albumRepository;
    private final ActivityLogRepository activityLogRepository;
    private final AnalyticsService analyticsService;

    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(String email) {
        User user = getUserByEmail(email);
        return mapToUserProfileResponse(user);
    }

    @Transactional
    public UserProfileResponse updateProfile(String email, ProfileUpdateRequest request) {
        User user = getUserByEmail(email);
        
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setBio(request.getBio());
        user.setCountry(request.getCountry());
        user.setTimezone(request.getTimezone());
        user.setLanguage(request.getLanguage());
        user.setFavoriteGenre(request.getFavoriteGenre());
        user.setFavoriteArtist(request.getFavoriteArtist());
        user.setTheme(request.getTheme());
        user.setPhoneNumber(request.getPhoneNumber());

        user = userRepository.save(user);

        logActivity(user, "Profile Updated", "User profile details were updated");

        return mapToUserProfileResponse(user);
    }

    @Transactional(readOnly = true)
    public ProfileStatsResponse getProfileStats(String email) {
        User user = getUserByEmail(email);
        List<Album> albums = albumRepository.findByUser_IdOrderByCreatedAtDesc(user.getId());

        int albumsSaved = albums.size();
        int artistsCount = (int) albums.stream().map(Album::getArtist).distinct().count();
        int genresCount = (int) albums.stream().map(Album::getGenre).distinct().count();
        
        double averageRating = albums.stream()
                .filter(a -> a.getPersonalRating() != null)
                .mapToInt(Album::getPersonalRating)
                .average()
                .orElse(0.0);
        
        int collectionHealth = Math.min(100, (albumsSaved * 2) + (genresCount * 5));
        int diversityScore = albumsSaved > 0 ? (int) Math.round((double) genresCount / albumsSaved * 100) : 0;
        int aiInsightCount = albumsSaved > 5 ? 3 : (albumsSaved > 0 ? 1 : 0);

        return ProfileStatsResponse.builder()
                .albumsSaved(albumsSaved)
                .artistsCount(artistsCount)
                .genresCount(genresCount)
                .averageRating(averageRating)
                .collectionHealth(collectionHealth)
                .diversityScore(diversityScore)
                .aiInsightCount(aiInsightCount)
                .build();
    }

    @Transactional(readOnly = true)
    public PersonalityResponse getListeningPersonality(String email) {
        User user = getUserByEmail(email);
        List<Album> albums = albumRepository.findByUser_IdOrderByCreatedAtDesc(user.getId());
        
        if (albums.isEmpty()) {
            return new PersonalityResponse("Newcomer", "Start saving albums to discover your personality.", "Music", 100);
        }

        int genresCount = (int) albums.stream().map(Album::getGenre).distinct().count();
        if (genresCount > 4) {
            return new PersonalityResponse("Explorer", "You love discovering different sounds across multiple genres.", "Compass", 85);
        }
        
        // Simple logic for other personalities
        return new PersonalityResponse("Collector", "You enjoy building a curated collection of favorite albums.", "Library", 90);
    }

    @Transactional(readOnly = true)
    public List<AchievementDto> getAchievements(String email) {
        User user = getUserByEmail(email);
        List<Album> albums = albumRepository.findByUser_IdOrderByCreatedAtDesc(user.getId());
        int albumsCount = albums.size();
        
        List<AchievementDto> achievements = new ArrayList<>();
        
        achievements.add(AchievementDto.builder()
                .id("first-album")
                .title("First Album Saved")
                .description("Saved your first album to the library")
                .icon("Star")
                .earned(albumsCount >= 1)
                .progress(Math.min(albumsCount, 1))
                .maxProgress(1)
                .build());
                
        achievements.add(AchievementDto.builder()
                .id("music-collector")
                .title("Music Collector")
                .description("Save 10 albums")
                .icon("Disc")
                .earned(albumsCount >= 10)
                .progress(Math.min(albumsCount, 10))
                .maxProgress(10)
                .build());
                
        int genresCount = (int) albums.stream().map(Album::getGenre).distinct().count();
        achievements.add(AchievementDto.builder()
                .id("genre-explorer")
                .title("Genre Explorer")
                .description("Explore 5 different genres")
                .icon("Globe")
                .earned(genresCount >= 5)
                .progress(Math.min(genresCount, 5))
                .maxProgress(5)
                .build());

        return achievements;
    }

    @Transactional(readOnly = true)
    public List<ActivityLogDto> getActivityTimeline(String email) {
        User user = getUserByEmail(email);
        List<ActivityLog> logs = activityLogRepository.findByUserOrderByTimestampDesc(user);
        
        return logs.stream().map(log -> ActivityLogDto.builder()
                .id(log.getId())
                .actionType(log.getActionType())
                .description(log.getDescription())
                .timestamp(log.getTimestamp())
                .build()
        ).collect(Collectors.toList());
    }

    @Transactional
    public void logActivity(User user, String actionType, String description) {
        ActivityLog log = ActivityLog.builder()
                .user(user)
                .actionType(actionType)
                .description(description)
                .build();
        activityLogRepository.save(log);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    private UserProfileResponse mapToUserProfileResponse(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .bio(user.getBio())
                .avatarUrl(user.getAvatarUrl())
                .country(user.getCountry())
                .timezone(user.getTimezone())
                .language(user.getLanguage())
                .favoriteGenre(user.getFavoriteGenre())
                .favoriteArtist(user.getFavoriteArtist())
                .theme(user.getTheme())
                .phoneNumber(user.getPhoneNumber())
                .createdAt(user.getCreatedAt())
                .lastLogin(user.getLastLogin())
                .build();
    }
}
