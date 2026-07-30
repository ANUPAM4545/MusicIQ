package com.musiciq.backend.repository;

import com.musiciq.backend.entity.ActivityLog;
import com.musiciq.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, UUID> {
    List<ActivityLog> findByUserOrderByTimestampDesc(User user);
}
