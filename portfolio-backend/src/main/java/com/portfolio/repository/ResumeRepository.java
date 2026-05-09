package com.portfolio.repository;

import com.portfolio.model.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepository extends MongoRepository<Resume, String> {
    Resume findTopByOrderByUploadTimeDesc();
}
