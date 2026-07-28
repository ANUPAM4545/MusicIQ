package com.musiciq.backend.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingAnalyticsDto {
    private Integer rating;
    private Long count;
}
