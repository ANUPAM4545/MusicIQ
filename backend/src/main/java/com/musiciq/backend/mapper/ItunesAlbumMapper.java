package com.musiciq.backend.mapper;

import com.musiciq.backend.client.itunes.ItunesAlbumDto;
import com.musiciq.backend.dto.album.AlbumDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ItunesAlbumMapper {

    @Mapping(source = "collectionId", target = "id")
    @Mapping(source = "collectionName", target = "title")
    @Mapping(source = "artistName", target = "artist")
    @Mapping(source = "artworkUrl100", target = "coverArtUrl")
    @Mapping(source = "primaryGenreName", target = "genre")
    @Mapping(source = "collectionViewUrl", target = "providerUrl")
    AlbumDto toAlbumDto(ItunesAlbumDto source);
}
