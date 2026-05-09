package com.portfolio.controller;

import com.portfolio.model.Certificate;
import com.portfolio.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @GetMapping
    public ResponseEntity<List<Certificate>> getAllCertificates() {
        return ResponseEntity.ok(certificateService.getAllCertificates());
    }

    @PostMapping

    public ResponseEntity<Certificate> createCertificate(@RequestBody Certificate certificate) {
        return ResponseEntity.status(HttpStatus.CREATED).body(certificateService.createCertificate(certificate));
    }

    @DeleteMapping("/{id}")

    public ResponseEntity<Void> deleteCertificate(@PathVariable String id) {
        certificateService.deleteCertificate(id);
        return ResponseEntity.noContent().build();
    }
}
