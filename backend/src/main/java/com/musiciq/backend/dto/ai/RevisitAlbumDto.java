package com.musiciq.backend.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RevisitAlbumDto {
    private String title;
    private String artist;
    private String coverArtUrl;
    private String reason;
}
