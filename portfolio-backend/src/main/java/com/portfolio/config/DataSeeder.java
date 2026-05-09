package com.portfolio.config;

import com.portfolio.model.User;
import com.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("Thirushan_2007").isEmpty()) {
            User admin = new User();
            admin.setUsername("Thirushan_2007");
            admin.setPassword(passwordEncoder.encode("DharThirushan@07"));
            admin.setEmail("admin@portfolio.local");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Secure Admin User seeded successfully!");
        }
    }
}
