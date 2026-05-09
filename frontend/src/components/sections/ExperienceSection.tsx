import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import Labyrinth from '../../styles/Labyrinth';

import { experienceService } from '../../services/portfolioService';
import { Experience } from '../../types';

const DEFAULT_EXPERIENCE: Experience[] = [
  {
    company: 'Loading...',
    role: 'Loading...',
    duration: '',
    location: '',
    description: ['Loading experience from database...'],
    technologies: [],
  }
];

/* Scroll-reveal hook */
const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.tl-item').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = React.useState<Experience[]>([]);
  useReveal();

  React.useEffect(() => {
    experienceService.getAll()
      .then(res => {
        if (res.data && res.data.length > 0) {
          setExperiences(res.data);
        }
      })
      .catch(err => console.error("Failed to fetch experiences", err));
  }, []);

  const displayExperiences = experiences.length > 0 ? experiences : DEFAULT_EXPERIENCE;

  return (
    <section id="experience" className="section relative overflow-hidden" style={{ background: 'var(--bg-2)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Labyrinth color="#B22222" cellCount={20} strokeWidth={2} />
      </div>

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: 52 }}>
          <p className="label-tag" style={{ marginBottom: 10 }}>04 — EXPERIENCE</p>
          <h2 className="h1">Work History</h2>
          <div className="divider" />
          <p className="body">Professional experience and internships</p>
        </motion.div>

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 19, top: 8, bottom: 8, width: 1,
            background: 'linear-gradient(180deg, var(--neon) 0%, rgba(0,200,255,0.1) 80%, transparent 100%)' }} />

          {/* Experience list mapping */}
          {displayExperiences.map((exp, index) => (
            <div key={index} className="tl-item" style={{ display: 'flex', gap: 28, paddingBottom: 36 }}>
              {/* Icon dot */}
              <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10,
                background: 'rgba(0,200,255,0.07)', border: '1px solid rgba(0,200,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative', marginLeft: 1 }}>
                <Briefcase size={15} style={{ color: 'var(--neon)' }} />
              </div>

              <div className="glass" style={{ flex: 1, padding: '24px 26px', borderRadius: 14 }}>
                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
                  <div>
                    <span className="tag" style={{ marginBottom: 8, display: 'inline-block' }}>Experience</span>
                    <h3 className="h2" style={{ marginBottom: 4 }}>{exp.company}</h3>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--neon)' }}>{exp.role}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={11} style={{ color: 'var(--neon)' }} />
                      <span className="caption">{exp.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={11} style={{ color: 'var(--neon)' }} />
                      <span className="caption">{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <p className="label-tag" style={{ marginBottom: 12 }}>{'// KEY RESPONSIBILITIES'}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {exp.description.map((r, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle2 size={12} style={{ color: 'var(--neon)', flexShrink: 0, marginTop: 2 }} />
                      <span className="body" style={{ fontSize: 13 }}>{r}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <>
                    <p className="label-tag" style={{ marginBottom: 10 }}>{'// TECHNOLOGIES'}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {exp.technologies.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Future node — scroll reveal */}
          <div className="tl-item" style={{ display: 'flex', gap: 28, transitionDelay: '0.15s' }}>
            <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10,
              border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 1 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--t3)' }}>?</span>
            </div>
            <div className="glass" style={{ flex: 1, padding: '18px 22px', borderRadius: 12,
              background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--t2)' }}>Open to new opportunities</p>
              <p className="caption" style={{ marginTop: 4 }}>Seeking full-time roles in software development & blockchain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
