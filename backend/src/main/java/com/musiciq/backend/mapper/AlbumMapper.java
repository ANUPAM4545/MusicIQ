package com.musiciq.backend.mapper;

import com.musiciq.backend.dto.library.AlbumCreateRequest;
import com.musiciq.backend.dto.library.AlbumUpdateRequest;
import com.musiciq.backend.dto.library.SavedAlbumResponse;
import com.musiciq.backend.entity.Album;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AlbumMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "personalNotes", ignore = true)
    @Mapping(target = "personalRating", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Album toEntity(AlbumCreateRequest request);

    SavedAlbumResponse toSavedAlbumResponse(Album album);

    List<SavedAlbumResponse> toSavedAlbumResponseList(List<Album> albums);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "itunesId", ignore = true)
    @Mapping(target = "title", ignore = true)
    @Mapping(target = "artist", ignore = true)
    @Mapping(target = "coverArtUrl", ignore = true)
    @Mapping(target = "releaseDate", ignore = true)
    @Mapping(target = "genre", ignore = true)
    @Mapping(target = "trackCount", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(AlbumUpdateRequest request, @MappingTarget Album album);
}
