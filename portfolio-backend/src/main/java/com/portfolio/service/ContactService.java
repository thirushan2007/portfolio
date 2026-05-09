package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContactService {
    @Autowired private ContactRepository contactRepository;

    public ContactMessage saveMessage(ContactMessage message) {
        return contactRepository.save(message);
    }

    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<ContactMessage> getUnreadMessages() {
        return contactRepository.findByReadFalse();
    }

    public ContactMessage markAsRead(String id) {
        ContactMessage msg = contactRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Message not found: " + id));
        msg.setRead(true);
        return contactRepository.save(msg);
    }
}
