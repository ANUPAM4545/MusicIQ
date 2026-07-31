package com.musiciq.backend.service;

import com.musiciq.backend.dto.library.AlbumCreateRequest;
import com.musiciq.backend.dto.library.AlbumUpdateRequest;
import com.musiciq.backend.dto.library.SavedAlbumResponse;
import com.musiciq.backend.entity.Album;
import com.musiciq.backend.entity.User;
import com.musiciq.backend.exception.DuplicateAlbumException;
import com.musiciq.backend.exception.ResourceNotFoundException;
import com.musiciq.backend.mapper.AlbumMapper;
import com.musiciq.backend.repository.AlbumRepository;
import com.musiciq.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class SavedAlbumService {

    private final AlbumRepository albumRepository;
    private final UserRepository userRepository;
    private final AlbumMapper albumMapper;
    private final ProfileService profileService;

    @Transactional
    public SavedAlbumResponse saveAlbum(String userEmail, AlbumCreateRequest request) {
        User user = getUser(userEmail);

        if (request.getItunesId() != null && !request.getItunesId().isBlank()) {
            if (albumRepository.existsByItunesIdAndUser_Id(request.getItunesId(), user.getId())) {
                log.warn("User {} attempted to save duplicate iTunes album {}", user.getId(), request.getItunesId());
                throw new DuplicateAlbumException("Album is already saved in your library");
            }
        }

        Album album = albumMapper.toEntity(request);
        album.setUser(user);

        Album savedAlbum = albumRepository.save(album);
        log.info("User {} saved album {} to library", user.getId(), savedAlbum.getId());

        profileService.logActivity(user, "Album Added", "Added '" + savedAlbum.getTitle() + "' by " + savedAlbum.getArtist() + " to library");

        return albumMapper.toSavedAlbumResponse(savedAlbum);
    }

    @Transactional(readOnly = true)
    public List<SavedAlbumResponse> getSavedAlbums(String userEmail) {
        User user = getUser(userEmail);
        List<Album> albums = albumRepository.findByUser_Id(user.getId());
        return albumMapper.toSavedAlbumResponseList(albums);
    }

    @Transactional(readOnly = true)
    public SavedAlbumResponse getAlbumDetails(String userEmail, UUID albumId) {
        Album album = getAlbumOwnedByUser(userEmail, albumId);
        return albumMapper.toSavedAlbumResponse(album);
    }

    @Transactional
    public SavedAlbumResponse updateAlbum(String userEmail, UUID albumId, AlbumUpdateRequest request) {
        Album album = getAlbumOwnedByUser(userEmail, albumId);
        
        albumMapper.updateEntityFromRequest(request, album);
        Album updatedAlbum = albumRepository.save(album);
        
        log.info("User {} updated album {}", album.getUser().getId(), album.getId());
        if (request.getPersonalRating() != null) {
            profileService.logActivity(album.getUser(), "Rating Updated", "Rated '" + updatedAlbum.getTitle() + "' " + request.getPersonalRating() + "/10");
        } else {
            profileService.logActivity(album.getUser(), "Album Updated", "Updated details for '" + updatedAlbum.getTitle() + "'");
        }
        return albumMapper.toSavedAlbumResponse(updatedAlbum);
    }

    @Transactional
    public void deleteAlbum(String userEmail, UUID albumId) {
        Album album = getAlbumOwnedByUser(userEmail, albumId);
        albumRepository.delete(album);
        log.info("User {} deleted album {}", album.getUser().getId(), album.getId());
    }

    private Album getAlbumOwnedByUser(String userEmail, UUID albumId) {
        User user = getUser(userEmail);
        return albumRepository.findByIdAndUser_Id(albumId, user.getId())
                .orElseThrow(() -> {
                    log.warn("User {} attempted to access non-existent or unauthorized album {}", user.getId(), albumId);
                    return new ResourceNotFoundException("Album not found in your library");
                });
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
