package com.musiciq.backend.dto.profile;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUpdateRequest {

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Size(max = 50)
    private String username;

    @Size(max = 500)
    private String bio;

    @Size(max = 50)
    private String country;

    @Size(max = 50)
    private String timezone;

    @Size(max = 50)
    private String language;

    @Size(max = 50)
    private String favoriteGenre;

    @Size(max = 50)
    private String favoriteArtist;

    @Size(max = 20)
    private String theme;

    @Size(max = 20)
    private String phoneNumber;
}
