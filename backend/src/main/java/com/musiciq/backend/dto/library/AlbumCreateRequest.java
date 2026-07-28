package com.musiciq.backend.dto.library;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlbumCreateRequest {

    @Schema(description = "iTunes identifier if available", example = "1122775993")
    private String itunesId;

    @Schema(description = "Album title", example = "A Rush of Blood to the Head")
    @NotBlank(message = "Title is required")
    private String title;

    @Schema(description = "Album artist", example = "Coldplay")
    @NotBlank(message = "Artist is required")
    private String artist;

    @Schema(description = "Cover art URL", example = "https://is1-ssl.mzstatic.com/image/thumb/...")
    @NotBlank(message = "Cover art URL is required")
    private String coverArtUrl;

    @Schema(description = "Release date", example = "2002-08-26T07:00:00Z")
    private String releaseDate;

    @Schema(description = "Primary genre", example = "Alternative")
    private String genre;

    @Schema(description = "Total tracks", example = "11")
    private Integer trackCount;
}
