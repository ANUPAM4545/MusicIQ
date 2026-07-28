package com.musiciq.backend.client;

import com.musiciq.backend.dto.album.AlbumSearchResponse;

public interface MusicProviderClient {
    AlbumSearchResponse searchAlbums(String term, int limit, int offset);
}
