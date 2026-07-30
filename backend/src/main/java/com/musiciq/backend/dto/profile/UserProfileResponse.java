package com.musiciq.backend.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String bio;
    private String avatarUrl;
    private String country;
    private String timezone;
    private String language;
    private String favoriteGenre;
    private String favoriteArtist;
    private String theme;
    private String phoneNumber;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
}
