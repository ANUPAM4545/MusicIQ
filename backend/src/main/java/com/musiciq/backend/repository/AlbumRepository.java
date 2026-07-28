package com.musiciq.backend.repository;

import com.musiciq.backend.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AlbumRepository extends JpaRepository<Album, UUID> {
    List<Album> findByUser_Id(UUID userId);
    Optional<Album> findByIdAndUser_Id(UUID id, UUID userId);
    boolean existsByItunesIdAndUser_Id(String itunesId, UUID userId);
}
