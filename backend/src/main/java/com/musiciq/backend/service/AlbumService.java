package com.musiciq.backend.service;

import com.musiciq.backend.client.MusicProviderClient;
import com.musiciq.backend.dto.album.AlbumSearchResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlbumService {

    private final MusicProviderClient musicProviderClient;

    public AlbumSearchResponse searchAlbums(String term, int limit, int offset) {
        log.info("Processing search request for term: '{}', limit: {}, offset: {}", term, limit, offset);
        return musicProviderClient.searchAlbums(term, limit, offset);
    }
}
