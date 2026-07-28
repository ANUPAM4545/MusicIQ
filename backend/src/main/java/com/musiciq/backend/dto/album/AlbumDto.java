package com.musiciq.backend.dto.album;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AlbumDto {
    private String id;
    private String title;
    private String artist;
    private String coverArtUrl;
    private String releaseDate;
    private String genre;
    private Integer trackCount;
    private String providerUrl;
}
