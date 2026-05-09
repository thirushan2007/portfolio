package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<Map<String, String>> sendMessage(@RequestBody ContactMessage message) {
        contactService.saveMessage(message);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Map.of("message", "Message sent successfully!"));
    }

    @GetMapping

    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @GetMapping("/unread")

    public ResponseEntity<List<ContactMessage>> getUnreadMessages() {
        return ResponseEntity.ok(contactService.getUnreadMessages());
    }

    @PutMapping("/{id}/read")

    public ResponseEntity<ContactMessage> markAsRead(@PathVariable String id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }
}
