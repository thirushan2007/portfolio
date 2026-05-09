package com.portfolio.repository;

import com.portfolio.model.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ContactRepository extends MongoRepository<ContactMessage, String> {
    List<ContactMessage> findByReadFalse();
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
}
