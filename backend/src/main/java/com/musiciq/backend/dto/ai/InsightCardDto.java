package com.musiciq.backend.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InsightCardDto {
    private String title;
    private String description;
    private String icon;
    private String priority; // e.g., HIGH, MEDIUM, LOW
    private InsightCategoryDto category;
}
