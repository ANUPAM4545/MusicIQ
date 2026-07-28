package com.musiciq.backend.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentAlbumDto {
    private String title;
    private String artist;
    private String coverArtUrl;
    private LocalDateTime addedDate;
}
