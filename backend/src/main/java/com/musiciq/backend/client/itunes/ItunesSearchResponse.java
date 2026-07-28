package com.musiciq.backend.client.itunes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ItunesSearchResponse {
    private Integer resultCount;
    private List<ItunesAlbumDto> results;
}
