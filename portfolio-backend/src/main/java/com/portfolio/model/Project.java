package com.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "projects")
public class Project {
    @Id
    private String id;
    private String title;
    private String description;
    private String longDescription;
    private List<String> techStack;
    private String githubLink;
    private String demoLink;
    private String imageUrl;
    private String category;
    private boolean featured = false;
    @CreatedDate
    private LocalDateTime createdAt;
}