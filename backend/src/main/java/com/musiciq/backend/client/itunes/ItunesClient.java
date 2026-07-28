package com.musiciq.backend.client.itunes;

import com.musiciq.backend.client.MusicProviderClient;
import com.musiciq.backend.dto.album.AlbumDto;
import com.musiciq.backend.dto.album.AlbumSearchResponse;
import com.musiciq.backend.exception.ExternalServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class ItunesClient implements MusicProviderClient {

    private final RestClient restClient;
    private final String searchEndpoint;

    public ItunesClient(
            RestClient.Builder restClientBuilder,
            @Value("${itunes.base-url}") String baseUrl,
            @Value("${itunes.search-endpoint}") String searchEndpoint) {
        this.restClient = restClientBuilder.baseUrl(baseUrl).build();
        this.searchEndpoint = searchEndpoint;
    }

    @Override
    public AlbumSearchResponse searchAlbums(String term, int limit, int offset) {
        log.info("Searching iTunes API for term: {}, limit: {}", term, limit);

        try {
            URI uri = UriComponentsBuilder.fromPath(searchEndpoint)
                    .queryParam("term", term)
                    .queryParam("entity", "album")
                    .queryParam("limit", limit)
                    .build()
                    .toUri();

            ItunesSearchResponse response = restClient.get()
                    .uri(uri)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, (req, res) -> {
                        log.error("iTunes API error: {}", res.getStatusCode());
                        throw new ExternalServiceException("Failed to fetch data from iTunes API. Status: " + res.getStatusCode());
                    })
                    .body(ItunesSearchResponse.class);

            if (response == null || response.getResults() == null) {
                log.warn("iTunes API returned empty response for term: {}", term);
                return AlbumSearchResponse.builder()
                        .albums(List.of())
                        .total(0)
                        .limit(limit)
                        .offset(offset)
                        .build();
            }

            log.info("iTunes API returned {} results", response.getResultCount());

            List<AlbumDto> mappedAlbums = response.getResults().stream()
                    // Apply offset manually since iTunes Search API doesn't support offset natively
                    .skip(offset)
                    .map(this::mapToAlbumDto)
                    .collect(Collectors.toList());

            return AlbumSearchResponse.builder()
                    .albums(mappedAlbums)
                    .total(response.getResultCount())
                    .limit(limit)
                    .offset(offset)
                    .build();

        } catch (ExternalServiceException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("Unexpected error while calling iTunes API", ex);
            throw new ExternalServiceException("Unexpected error integrating with music provider", ex);
        }
    }

    private AlbumDto mapToAlbumDto(ItunesAlbumDto itunesAlbum) {
        return AlbumDto.builder()
                .id(String.valueOf(itunesAlbum.getCollectionId()))
                .title(itunesAlbum.getCollectionName())
                .artist(itunesAlbum.getArtistName())
                .coverArtUrl(itunesAlbum.getArtworkUrl100())
                .releaseDate(itunesAlbum.getReleaseDate())
                .genre(itunesAlbum.getPrimaryGenreName())
                .trackCount(itunesAlbum.getTrackCount())
                .providerUrl(itunesAlbum.getCollectionViewUrl())
                .build();
    }
}
