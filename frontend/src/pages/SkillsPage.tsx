import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillItem { name: string; level: number; color: string; }
interface SkillCategory { category: string; icon: string; color: string; skills: SkillItem[]; }

const allSkills: SkillCategory[] = [
  {
    category: 'Frontend', icon: '⚛️', color: '#00d4ff',
    skills: [
      { name: 'HTML', level: 95, color: '#f97316' },
      { name: 'CSS', level: 90, color: '#06b6d4' },
      { name: 'JavaScript', level: 88, color: '#eab308' },
      { name: 'TypeScript', level: 82, color: '#3b82f6' },
      { name: 'React', level: 85, color: '#61dafb' },
      { name: 'Tailwind CSS', level: 88, color: '#06b6d4' },
    ],
  },
  {
    category: 'Backend', icon: '☕', color: '#bf5af2',
    skills: [
      { name: 'Java', level: 85, color: '#f97316' },
      { name: 'Spring Boot', level: 80, color: '#86efac' },
      { name: 'Node.js', level: 72, color: '#86efac' },
      { name: 'Express.js', level: 70, color: '#94a3b8' },
    ],
  },
  {
    category: 'Database', icon: '🗄️', color: '#10b981',
    skills: [
      { name: 'MongoDB', level: 82, color: '#86efac' },
      { name: 'MySQL', level: 75, color: '#06b6d4' },
    ],
  },
  {
    category: 'Blockchain', icon: '🔷', color: '#f59e0b',
    skills: [
      { name: 'Solidity', level: 70, color: '#94a3b8' },
      { name: 'Hardhat', level: 65, color: '#f59e0b' },
      { name: 'Ethers.js', level: 68, color: '#8b5cf6' },
    ],
  },
  {
    category: 'Mobile', icon: '📱', color: '#ec4899',
    skills: [
      { name: 'Flutter', level: 65, color: '#38bdf8' },
    ],
  },
  {
    category: 'Tools', icon: '🛠️', color: '#94a3b8',
    skills: [
      { name: 'Git', level: 88, color: '#f97316' },
      { name: 'GitHub', level: 88, color: '#94a3b8' },
      { name: 'Docker', level: 65, color: '#38bdf8' },
      { name: 'Firebase', level: 72, color: '#f59e0b' },
      { name: 'Postman', level: 85, color: '#f97316' },
    ],
  },
];

const SkillCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, rotateY: 5, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card p-6 cursor-default"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="text-3xl">{category.icon}</div>
        <div>
          <h3 className="font-orbitron font-bold text-white text-lg">{category.category}</h3>
          <p className="text-slate-500 text-xs">{category.skills.length} skills</p>
        </div>
        <div className="ml-auto w-3 h-3 rounded-full animate-pulse" style={{ background: category.color }} />
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
              <span className="text-xs font-mono-code" style={{ color: skill.color }}>{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <motion.div
                className="skill-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Animated border bottom */}
      <motion.div
        className="mt-5 h-px rounded"
        animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: `linear-gradient(90deg, transparent, ${category.color}, transparent)` }}
      />
    </motion.div>
  );
};

const SkillsPage: React.FC = () => (
  <div className="relative min-h-screen bg-dark pt-24 pb-16 overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
    <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="text-center mb-16">
        <h1 className="font-orbitron font-black text-4xl sm:text-5xl mb-4 neon-text">Skills</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Technologies I work with to bring ideas to life</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allSkills.map((cat, i) => (
          <SkillCard key={cat.category} category={cat} index={i} />
        ))}
      </div>

      {/* Tech cloud */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.7 }} className="mt-16 text-center">
        <h2 className="font-orbitron text-2xl font-bold text-white mb-8">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {allSkills.flatMap(c => c.skills).map((skill) => (
            <motion.span
              key={skill.name}
              whileHover={{ scale: 1.1, y: -3 }}
              className="px-4 py-2 rounded-full glass border text-sm font-medium cursor-default transition-all duration-300"
              style={{ borderColor: `${skill.color}40`, color: skill.color }}
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default SkillsPage;
