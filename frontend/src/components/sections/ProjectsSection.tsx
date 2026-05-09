import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../SocialIcons';
import { Project } from '../../types';
import { GravityStarsBackground } from '../animate-ui/components/backgrounds/gravity-stars';

import { projectService } from '../../services/portfolioService';

// Fallback skeleton in case DB is empty initially, but will be overwritten by DB data
const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1', title: 'Loading...', category: 'Loading', featured: true,
    description: 'Loading projects from database...',
    longDescription: 'Loading...',
    techStack: ['Loading'],
    githubLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80',
  }
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 340 : -340, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -340 : 340, opacity: 0, scale: 0.96 }),
};

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  React.useEffect(() => {
    projectService.getAll()
      .then(res => {
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch(err => console.error("Failed to fetch projects", err));
  }, []);

  const go = (d: number) => {
    if (projects.length <= 1) return;
    setDir(d);
    setIdx(i => (i + d + projects.length) % projects.length);
  };

  const p = projects[idx] || DEFAULT_PROJECTS[0];

  return (
    <section id="projects" className="section relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Gravity Stars Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, color: '#B22222', pointerEvents: 'none' }}>
        <GravityStarsBackground
          starsCount={800}
          starsSize={2}
          starsOpacity={0.85}
          glowIntensity={25}
          movementSpeed={0.5}
          mouseInfluence={200}
          mouseGravity="attract"
          gravityStrength={100}
          starsInteraction={true}
          starsInteractionType="bounce"
        />
      </div>

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: 48 }}>
          <p className="label-tag" style={{ marginBottom: 10 }}>03 — PROJECTS</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 className="h1">What I've Built</h2>
              <div className="divider" />
            </div>
            {/* Counter */}
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--t3)' }}>
              <span style={{ color: 'var(--neon)', fontWeight: 600 }}>{String(idx + 1).padStart(2, '0')}</span>
              {' / '}{String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 16 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={p.id} custom={dir} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>

              {/* Card */}
              <div className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 400 }}
                  className="flex-col lg:grid">

                  {/* Image */}
                  <div style={{ position: 'relative', overflow: 'hidden', minHeight: 260 }}>
                    <img src={p.imageUrl} alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0,
                      background: 'linear-gradient(135deg, rgba(8,8,8,0.4) 0%, transparent 60%)' }} />
                    {p.featured && (
                      <div style={{ position: 'absolute', top: 16, left: 16 }}>
                        <span className="tag">★ Featured</span>
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: 16, right: 16 }}>
                      <span className="tag">{p.category}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <p className="label-tag" style={{ marginBottom: 10 }}>{p.category}</p>
                      <h3 style={{ fontSize: '1.45rem', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 14, color: 'var(--t1)', lineHeight: 1.2 }}>{p.title}</h3>
                      <p className="body" style={{ fontSize: '13px', lineHeight: 1.75, marginBottom: 20 }}>{p.longDescription || p.description}</p>

                      {/* Tech */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 28 }}>
                        {p.techStack.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: 10 }}>
                      {p.githubLink && (
                        <a href={p.githubLink} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: 12 }}>
                          <GithubIcon size={13} /> Code
                        </a>
                      )}
                      {p.demoLink && (
                        <a href={p.demoLink} target="_blank" rel="noreferrer" className="btn btn-solid" style={{ fontSize: 12 }}>
                          <ExternalLink size={13} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 28 }}>
          <button onClick={() => go(-1)} className="btn btn-ghost"
            style={{ width: 42, height: 42, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8 }}>
            {projects.map((_, i) => (
              <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                style={{
                  width: i === idx ? 24 : 6, height: 6, borderRadius: 3,
                  background: i === idx ? 'var(--neon)' : 'rgba(255,255,255,0.15)',
                  border: 'none', transition: 'all 0.3s ease',
                  boxShadow: i === idx ? '0 0 8px var(--neon)' : 'none',
                }} />
            ))}
          </div>

          <button onClick={() => go(1)} className="btn btn-ghost"
            style={{ width: 42, height: 42, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
