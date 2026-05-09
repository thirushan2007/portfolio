package com.portfolio.service;

import com.portfolio.model.Skill;
import com.portfolio.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAllByOrderByOrderAsc();
    }

    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill updateSkill(String id, Skill updated) {
        Skill existing = skillRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Skill not found: " + id));
        existing.setName(updated.getName());
        existing.setIcon(updated.getIcon());
        existing.setCategory(updated.getCategory());
        existing.setColor(updated.getColor());
        existing.setBg(updated.getBg());
        existing.setOrder(updated.getOrder());
        return skillRepository.save(existing);
    }

    public void deleteSkill(String id) {
        skillRepository.deleteById(id);
    }

    public void seedDefaultSkills() {
        if (skillRepository.count() > 0) return;
        List<Skill> defaults = List.of(
            new Skill(null, "React",      "⚛️", "Frontend",   "#61DAFB", "#0d2030", 1),
            new Skill(null, "TypeScript", "🔷", "Frontend",   "#3178C6", "#0d1525", 2),
            new Skill(null, "Tailwind",   "🎨", "Frontend",   "#38BDF8", "#0d1e28", 3),
            new Skill(null, "Java",       "☕", "Backend",    "#ED8B00", "#201400", 4),
            new Skill(null, "Spring",     "🌱", "Backend",    "#6DB33F", "#0d1e0d", 5),
            new Skill(null, "Node.js",    "🟢", "Backend",    "#339933", "#0d1a0d", 6),
            new Skill(null, "MongoDB",    "🍃", "Database",   "#47A248", "#0d1e0d", 7),
            new Skill(null, "MySQL",      "🗄️", "Database",   "#00758F", "#0d1a1e", 8),
            new Skill(null, "Solidity",   "🔗", "Blockchain", "#A0AEC0", "#181820", 9),
            new Skill(null, "Flutter",    "📱", "Mobile",     "#54C5F8", "#0d1e28", 10),
            new Skill(null, "Docker",     "🐳", "DevOps",     "#2496ED", "#0d1825", 11),
            new Skill(null, "Git",        "🔀", "DevOps",     "#F05032", "#200d0a", 12)
        );
        skillRepository.saveAll(defaults);
    }
}
