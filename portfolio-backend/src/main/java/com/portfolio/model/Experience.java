package com.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "experiences")
public class Experience {
    @Id
    private String id;
    private String company;
    private String role;
    private String duration;
    private String location;
    private List<String> description;
    private List<String> technologies;
}
