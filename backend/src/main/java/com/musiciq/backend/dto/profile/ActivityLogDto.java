package com.musiciq.backend.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityLogDto {
    private UUID id;
    private String actionType;
    private String description;
    private LocalDateTime timestamp;
}
