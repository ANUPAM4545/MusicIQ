package com.musiciq.backend.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollectionHealthDto {
    private Integer score;
    private String title;
    private String description;
    
    // Breakdown metrics
    private Integer ratedAlbumsScore;
    private Integer metadataCompletenessScore;
    private Integer genreDiversityScore;
    private Integer artistDiversityScore;
    private Integer collectionActivityScore;
}
