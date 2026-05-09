package com.portfolio.service;

import com.portfolio.model.Resume;
import com.portfolio.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResumeService {
    @Autowired
    private ResumeRepository resumeRepository;

    public Resume saveResume(Resume resume) {
        resume.setUploadTime(System.currentTimeMillis());
        return resumeRepository.save(resume);
    }

    public Resume getLatestResume() {
        return resumeRepository.findTopByOrderByUploadTimeDesc();
    }
}
