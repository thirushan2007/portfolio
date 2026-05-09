package com.portfolio.controller;

import com.portfolio.model.Resume;
import com.portfolio.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(@RequestBody Map<String, String> payload) {
        try {
            Resume resume = new Resume();
            resume.setFileName(payload.get("fileName"));
            resume.setContentType(payload.get("contentType"));
            resume.setBase64Data(payload.get("base64Data"));
            Resume saved = resumeService.saveResume(resume);
            return ResponseEntity.ok(Map.of("message", "Resume uploaded successfully", "id", saved.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadResume() {
        Resume latest = resumeService.getLatestResume();
        if (latest == null || latest.getBase64Data() == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] pdfBytes;
        try {
            String base64 = latest.getBase64Data();
            if (base64.contains(",")) {
                base64 = base64.substring(base64.indexOf(",") + 1);
            }
            pdfBytes = Base64.getDecoder().decode(base64);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        String filename = latest.getFileName() != null ? latest.getFileName() : "resume.pdf";
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
