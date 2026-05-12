import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Cpu, MapPin, Mail, Calendar } from 'lucide-react';
import BackgroundBeams from '../../styles/BackgroundBeams';

const education = [
  { degree: 'B.E. Computer Science Engineering', school: 'Sri Venkateswara College of Engineering', year: '2024–2028', grade: 'CGPA 8.34' },
  { degree: 'Higher Secondary (HSC)', school: 'State Board, Tamil Nadu', year: '2023–2024', grade: '92%' },
  { degree: 'SSLC', school: 'State Board, Tamil Nadu', year: '2021–2022', grade: '95%' },
];

const traits = [
  { icon: Code, label: 'Full Stack Dev', color: '#D4FF00' },
  { icon: Cpu, label: 'Blockchain & Web3', color: '#6B8E23' },
  { icon: GraduationCap, label: 'Lifelong Learner', color: '#B22222' },
];

const rise = (i: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } },
});

const AboutSection: React.FC = () => (
  <section id="about" className="section relative overflow-hidden" style={{ background: 'var(--bg-2)' }}>
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.8, pointerEvents: 'none' }}>
      <BackgroundBeams />
    </div>

    <div className="absolute right-0 top-0 w-80 h-80 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(107,142,35,0.05) 0%, transparent 70%)' }} />
    <div className="absolute left-1/4 bottom-0 w-64 h-64 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(178,34,34,0.05) 0%, transparent 70%)' }} />

    <div className="container relative z-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={rise(0)}
        style={{ marginBottom: 56 }}>
        <p className="label-tag" style={{ marginBottom: 10 }}>01 — ABOUT</p>
        <h2 className="h1">Who I Am</h2>
        <div className="divider" />
        <p className="body" style={{ maxWidth: 520 }}>A developer who loves building things that matter</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

        {/* ── Left col ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={rise(1)}
            style={{ padding: '28px 32px', background: 'var(--bg-card)', borderRadius: 'var(--r)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', userSelect: 'none' }}>
            <h3 style={{ fontFamily: 'var(--din)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--t1)', marginBottom: 16 }}>
              Hi, I'm{' '}
              <span style={{ color: 'var(--crimson)', textShadow: '0 0 20px rgba(178,34,34,0.4)' }}>Thirushan</span>
            </h3>
            <p className="body" style={{ marginBottom: 14, lineHeight: 1.8 }}>
              I'm a <strong style={{ color: 'var(--t1)', fontWeight: 600 }}>Full Stack Developer</strong> and Blockchain
              enthusiast currently pursuing my BE in Computer Science Engineering. I specialise in building end-to-end
              web applications with clean, maintainable code.
            </p>
            <p className="body" style={{ lineHeight: 1.8 }}>
              My goal is to contribute to innovative teams where cutting-edge technology meets impactful solutions —
              from traditional web apps to decentralised blockchain platforms.
            </p>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: MapPin, text: 'Tamil Nadu, India', color: 'var(--crimson)' },
                { icon: Mail, text: 's.r.thirushan2002@gmail.com', color: 'var(--neon)' },
                { icon: GraduationCap, text: 'B.E. CSE — Graduating 2025', color: 'var(--olive)' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: color + '18', border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={13} style={{ color }} />
                  </div>
                  <span className="body" style={{ fontSize: 13 }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trait pills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {traits.map(({ icon: Icon, label, color }, i) => (
              <motion.div key={label} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={rise(2 + i)}
                style={{ padding: '18px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--r)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', userSelect: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: color + '15', border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--t2)', fontWeight: 500 }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right col: Education timeline ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={rise(2)}>
          <p className="label-tag" style={{ marginBottom: 24 }}>Education</p>

          {/* Timeline container */}
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Vertical line — runs full height, left-aligned at dot center */}
            <div style={{
              position: 'absolute', left: 8, top: 6, bottom: 24,
              width: 2,
              background: 'linear-gradient(180deg, var(--crimson) 0%, var(--olive) 60%, transparent 100%)',
              borderRadius: 2,
            }} />

            {education.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={rise(3 + i)}
                style={{ position: 'relative', marginBottom: 20 }}>
                {/* Dot — sits on the line */}
                <div style={{
                  position: 'absolute', left: -24, top: 6,
                  width: 10, height: 10, borderRadius: '50%',
                  background: i === 0 ? 'var(--crimson)' : i === 1 ? 'var(--olive)' : 'var(--neon)',
                  boxShadow: `0 0 8px ${i === 0 ? 'rgba(178,34,34,0.7)' : i === 1 ? 'rgba(107,142,35,0.7)' : 'rgba(212,255,0,0.7)'}`,
                  border: '2px solid var(--bg-2)',
                  zIndex: 1,
                }} />

                <div style={{ padding: '16px 20px', background: 'var(--bg-card)', borderRadius: 'var(--r)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <Calendar size={10} style={{ color: 'var(--crimson)' }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--crimson)', opacity: 0.8 }}>{e.year}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--din)', fontWeight: 600, fontSize: 15, color: 'var(--t1)', marginBottom: 4 }}>{e.degree}</p>
                  <p className="caption" style={{ marginBottom: 10 }}>{e.school}</p>
                  <span className="tag">{e.grade}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Career objective */}
          <div style={{ padding: '20px 24px', marginTop: 4, background: 'var(--bg-card)', borderRadius: 'var(--r)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', userSelect: 'none' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--neon)', opacity: 0.8, marginBottom: 10 }}>
              <span style={{ color: 'var(--olive)' }}>{'// '}</span>career_objective
            </p>
            <p className="body" style={{ fontSize: 13, lineHeight: 1.8 }}>
              Seeking full-stack or blockchain roles where I can leverage my skills to ship impactful, scalable products.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
