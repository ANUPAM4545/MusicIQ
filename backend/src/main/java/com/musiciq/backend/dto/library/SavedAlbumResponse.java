package com.musiciq.backend.dto.library;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedAlbumResponse {
    private UUID id;
    private String itunesId;
    private String title;
    private String artist;
    private String coverArtUrl;
    private String releaseDate;
    private String genre;
    private Integer trackCount;
    private String personalNotes;
    private Integer personalRating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
