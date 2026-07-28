package com.musiciq.backend.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopAlbumDto {
    private String title;
    private String artist;
    private Integer rating;
    private String coverArtUrl;
}
