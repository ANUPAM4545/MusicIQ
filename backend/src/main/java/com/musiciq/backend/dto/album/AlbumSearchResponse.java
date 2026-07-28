package com.musiciq.backend.dto.album;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AlbumSearchResponse {
    private List<AlbumDto> albums;
    private int total;
    private int limit;
    private int offset;
}
