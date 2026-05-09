package com.portfolio.service;

import com.portfolio.model.Experience;
import com.portfolio.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    public Experience createExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    public Experience updateExperience(String id, Experience updatedExperience) {
        return experienceRepository.findById(id)
                .map(experience -> {
                    experience.setCompany(updatedExperience.getCompany());
                    experience.setRole(updatedExperience.getRole());
                    experience.setDuration(updatedExperience.getDuration());
                    experience.setLocation(updatedExperience.getLocation());
                    experience.setDescription(updatedExperience.getDescription());
                    experience.setTechnologies(updatedExperience.getTechnologies());
                    return experienceRepository.save(experience);
                })
                .orElseThrow(() -> new RuntimeException("Experience not found with id " + id));
    }

    public void deleteExperience(String id) {
        experienceRepository.deleteById(id);
    }
}
