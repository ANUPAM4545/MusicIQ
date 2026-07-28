package com.musiciq.backend.controller;

import com.musiciq.backend.dto.album.AlbumSearchResponse;
import com.musiciq.backend.dto.common.ApiResponse;
import com.musiciq.backend.service.AlbumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
@Tag(name = "Albums", description = "Album search and management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class AlbumController {

    private final AlbumService albumService;

    @Operation(summary = "Search albums via external provider")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<AlbumSearchResponse>> searchAlbums(
            @RequestParam @NotBlank(message = "Search term must not be blank") String term,
            @RequestParam(defaultValue = "50") @Min(1) @Max(50) int limit,
            @RequestParam(defaultValue = "0") @Min(0) int offset
    ) {
        String query = term.trim();
        log.info("Received request to search albums with term: '{}', limit: {}, offset: {}", query, limit, offset);
        
        AlbumSearchResponse response = albumService.searchAlbums(query, limit, offset);
        return ResponseEntity.ok(ApiResponse.success("Search completed successfully", response));
    }
}
