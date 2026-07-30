package com.musiciq.backend.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AchievementDto {
    private String id;
    private String title;
    private String description;
    private String icon;
    private boolean earned;
    private int progress;
    private int maxProgress;
}
