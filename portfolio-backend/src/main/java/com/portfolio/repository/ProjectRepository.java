package com.portfolio.repository;

import com.portfolio.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByCategory(String category);
    List<Project> findByFeatured(boolean featured);
}
