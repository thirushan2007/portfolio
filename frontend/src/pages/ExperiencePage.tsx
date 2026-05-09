import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    company: 'Daily Works Infrastructure Pvt Ltd',
    role: 'Testing & Automation Intern',
    duration: 'June 2024 – August 2024',
    location: 'Chennai, Tamil Nadu',
    type: 'Internship',
    color: '#00d4ff',
    responsibilities: [
      'Performed comprehensive website testing across multiple browsers and devices',
      'Identified, documented, and tracked bugs using standard bug-reporting methodologies',
      'Assisted in automation testing setup and test script development',
      'Collaborated with development team to reproduce and resolve issues',
      'Prepared detailed bug reports and submitted to the development team',
      'Participated in sprint reviews and quality assurance meetings',
    ],
    technologies: ['Selenium', 'Java', 'TestNG', 'JIRA', 'Postman', 'Browser DevTools'],
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const ExperiencePage: React.FC = () => (
  <div className="relative min-h-screen bg-dark pt-24 pb-16 overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="font-orbitron font-black text-4xl sm:text-5xl mb-4 neon-text">Experience</h1>
        <p className="text-slate-400 max-w-xl mx-auto">My professional journey so far</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent" />

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative pl-20 pb-12"
          >
            {/* Dot */}
            <div className="absolute left-4 top-1 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `${exp.color}20`, border: `2px solid ${exp.color}` }}>
              <Briefcase size={14} style={{ color: exp.color }} />
            </div>

            {/* Card */}
            <div className="glass-card p-8">
              {/* Header */}
              <div className="flex flex-wrap gap-4 items-start justify-between mb-6">
                <div>
                  <span className="text-xs px-2 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 mb-2 inline-block">{exp.type}</span>
                  <h2 className="font-orbitron font-bold text-2xl text-white mb-1">{exp.company}</h2>
                  <p className="text-xl font-semibold" style={{ color: exp.color }}>{exp.role}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-cyan-400" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-purple-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Key Responsibilities</h3>
                <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="space-y-3">
                  {exp.responsibilities.map((r, ri) => (
                    <motion.li key={ri} variants={item} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm leading-relaxed">{r}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Tech used */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs glass border border-purple-500/30 text-purple-300">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Future */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="relative pl-20">
          <div className="absolute left-4 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-dashed border-slate-600">
            <span className="text-slate-600 text-xs">?</span>
          </div>
          <div className="glass-card p-6 border-dashed border-slate-700">
            <p className="text-slate-500 font-medium">Open to new opportunities...</p>
            <p className="text-slate-600 text-sm mt-1">Looking for full-time roles in software development & blockchain</p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default ExperiencePage;
