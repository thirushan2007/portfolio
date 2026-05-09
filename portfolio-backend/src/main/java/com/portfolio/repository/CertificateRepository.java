package com.portfolio.repository;

import com.portfolio.model.Certificate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CertificateRepository extends MongoRepository<Certificate, String> {}
