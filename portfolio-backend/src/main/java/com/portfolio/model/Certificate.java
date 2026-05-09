package com.portfolio.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "certificates")
public class Certificate {
    @Id
    private String id;
    private String title;
    private String issuer;
    private String date;
    private String credentialUrl;
    private String imageUrl;
    private String description;
}
