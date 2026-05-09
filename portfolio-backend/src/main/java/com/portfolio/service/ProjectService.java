package com.portfolio.service;

import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {
    @Autowired private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(String id) {
        return projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found: " + id));
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(String id, Project updated) {
        Project existing = getProjectById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setLongDescription(updated.getLongDescription());
        existing.setTechStack(updated.getTechStack());
        existing.setGithubLink(updated.getGithubLink());
        existing.setDemoLink(updated.getDemoLink());
        existing.setImageUrl(updated.getImageUrl());
        existing.setCategory(updated.getCategory());
        existing.setFeatured(updated.isFeatured());
        return projectRepository.save(existing);
    }

    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }

    public List<Project> getByCategory(String category) {
        return projectRepository.findByCategory(category);
    }

    public List<Project> getFeaturedProjects() {
        return projectRepository.findByFeatured(true);
    }
}
