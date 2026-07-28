package com.musiciq.backend.client.itunes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ItunesAlbumDto {
    private Long collectionId;
    private String collectionName;
    private String artistName;
    private String artworkUrl100;
    private String releaseDate;
    private String primaryGenreName;
    private Integer trackCount;
    private String collectionViewUrl;
}
