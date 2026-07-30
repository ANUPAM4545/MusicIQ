package com.musiciq.backend.controller;

import com.musiciq.backend.dto.common.ApiResponse;
import com.musiciq.backend.dto.profile.*;
import com.musiciq.backend.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@Tag(name = "Profile", description = "User profile management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class ProfileController {

    private final ProfileService profileService;

    @Operation(summary = "Get current user's profile")
    @GetMapping
    public ResponseEntity<ApiResponse<UserProfileResponse>> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {
        UserProfileResponse response = profileService.getProfile(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", response));
    }

    @Operation(summary = "Update current user's profile")
    @PutMapping
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ProfileUpdateRequest request) {
        UserProfileResponse response = profileService.updateProfile(userDetails.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", response));
    }

    @Operation(summary = "Get user profile statistics")
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<ProfileStatsResponse>> getProfileStats(
            @AuthenticationPrincipal UserDetails userDetails) {
        ProfileStatsResponse response = profileService.getProfileStats(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Profile stats retrieved successfully", response));
    }

    @Operation(summary = "Get user listening personality")
    @GetMapping("/personality")
    public ResponseEntity<ApiResponse<PersonalityResponse>> getListeningPersonality(
            @AuthenticationPrincipal UserDetails userDetails) {
        PersonalityResponse response = profileService.getListeningPersonality(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Listening personality retrieved successfully", response));
    }

    @Operation(summary = "Get user achievements")
    @GetMapping("/achievements")
    public ResponseEntity<ApiResponse<List<AchievementDto>>> getAchievements(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<AchievementDto> response = profileService.getAchievements(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Achievements retrieved successfully", response));
    }

    @Operation(summary = "Get user activity timeline")
    @GetMapping("/activity")
    public ResponseEntity<ApiResponse<List<ActivityLogDto>>> getActivityTimeline(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<ActivityLogDto> response = profileService.getActivityTimeline(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Activity timeline retrieved successfully", response));
    }
}
