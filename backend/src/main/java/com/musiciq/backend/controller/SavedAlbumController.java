package com.musiciq.backend.controller;

import com.musiciq.backend.dto.common.ApiResponse;
import com.musiciq.backend.dto.library.AlbumCreateRequest;
import com.musiciq.backend.dto.library.AlbumUpdateRequest;
import com.musiciq.backend.dto.library.SavedAlbumResponse;
import com.musiciq.backend.service.SavedAlbumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/library/albums")
@RequiredArgsConstructor
@Tag(name = "Personal Library", description = "Manage saved albums")
@SecurityRequirement(name = "Bearer Authentication")
public class SavedAlbumController {

    private final SavedAlbumService savedAlbumService;

    @Operation(summary = "Save an album to the user's library")
    @PostMapping
    public ResponseEntity<ApiResponse<SavedAlbumResponse>> saveAlbum(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AlbumCreateRequest request
    ) {
        SavedAlbumResponse response = savedAlbumService.saveAlbum(userDetails.getUsername(), request);
        return new ResponseEntity<>(ApiResponse.success("Album saved successfully", response), HttpStatus.CREATED);
    }

    @Operation(summary = "List all albums in the user's library")
    @GetMapping
    public ResponseEntity<ApiResponse<List<SavedAlbumResponse>>> getSavedAlbums(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<SavedAlbumResponse> response = savedAlbumService.getSavedAlbums(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Albums retrieved successfully", response));
    }

    @Operation(summary = "Get details of a specific saved album")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SavedAlbumResponse>> getAlbumDetails(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id
    ) {
        SavedAlbumResponse response = savedAlbumService.getAlbumDetails(userDetails.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Album retrieved successfully", response));
    }

    @Operation(summary = "Update personal metadata for a saved album")
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<SavedAlbumResponse>> updateAlbum(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id,
            @Valid @RequestBody AlbumUpdateRequest request
    ) {
        SavedAlbumResponse response = savedAlbumService.updateAlbum(userDetails.getUsername(), id, request);
        return ResponseEntity.ok(ApiResponse.success("Album updated successfully", response));
    }

    @Operation(summary = "Remove an album from the user's library")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAlbum(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id
    ) {
        savedAlbumService.deleteAlbum(userDetails.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Album removed successfully"));
    }
}
