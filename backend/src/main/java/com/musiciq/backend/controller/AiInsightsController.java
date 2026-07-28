package com.musiciq.backend.controller;

import com.musiciq.backend.dto.ai.AiInsightsResponse;
import com.musiciq.backend.dto.common.ApiResponse;
import com.musiciq.backend.service.AiInsightsService;
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
@RequestMapping("/api/ai/insights")
@RequiredArgsConstructor
@Tag(name = "AI Insights", description = "Generate intelligent insights from the personal library")
@SecurityRequirement(name = "Bearer Authentication")
public class AiInsightsController {

    private final AiInsightsService aiInsightsService;

    @Operation(summary = "Generate AI insights based on the user's music library")
    @GetMapping
    public ResponseEntity<ApiResponse<AiInsightsResponse>> getInsights(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        AiInsightsResponse response = aiInsightsService.getInsights(userDetails.getUsername());
        
        String message = "Insights generated successfully";
        if (response.getInsights() == null || response.getInsights().isEmpty()) {
            message = "No insights available yet.";
        }

        return ResponseEntity.ok(ApiResponse.success(message, response));
    }
}
