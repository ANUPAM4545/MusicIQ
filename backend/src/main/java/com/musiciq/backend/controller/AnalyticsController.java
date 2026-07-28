package com.musiciq.backend.controller;

import com.musiciq.backend.dto.analytics.AnalyticsOverviewResponse;
import com.musiciq.backend.dto.common.ApiResponse;
import com.musiciq.backend.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@Tag(name = "Analytics", description = "Generate insights from the user's personal library")
@SecurityRequirement(name = "Bearer Authentication")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @Operation(summary = "Get analytics overview of saved albums")
    @GetMapping("/overview")
    public ResponseEntity<ApiResponse<AnalyticsOverviewResponse>> getAnalyticsOverview(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        AnalyticsOverviewResponse response = analyticsService.getAnalyticsOverview(userDetails.getUsername());
        
        String message = "Analytics generated successfully";
        if (response.getTotalAlbums() == 0) {
            message = "No analytics available yet.";
        }

        return ResponseEntity.ok(ApiResponse.success(message, response));
    }
}
