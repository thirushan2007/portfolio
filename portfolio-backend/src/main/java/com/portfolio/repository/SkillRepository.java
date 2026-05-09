package com.portfolio.repository;

import com.portfolio.model.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SkillRepository extends MongoRepository<Skill, String> {
    List<Skill> findAllByOrderByOrderAsc();
    List<Skill> findByCategory(String category);
}
