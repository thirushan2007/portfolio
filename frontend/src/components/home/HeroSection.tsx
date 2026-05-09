import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown, Terminal } from 'lucide-react';
import { useTypingAnimation } from '../../hooks/useCustomHooks';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';

const HeroScene = React.lazy(() => import('./HeroScene'));

const roles = [
  'Full Stack Developer',
  'Java Developer',
  'Blockchain Developer',
  'React Developer',
];

const FloatingIcon: React.FC<{ icon: string; style: React.CSSProperties }> = ({ icon, style }) => (
  <motion.div
    animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
    className="absolute glass border border-cyan-400/20 rounded-xl p-3 text-2xl select-none pointer-events-none"
    style={style}
  >
    {icon}
  </motion.div>
);

const HeroSection: React.FC = () => {
  const typedText = useTypingAnimation(roles, 80, 2000);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass border border-cyan-400/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-cyan-400 font-mono-code">Available for opportunities</span>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-slate-400 font-mono-code text-lg mb-2">
              <span className="text-cyan-400">{'>'}</span> Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-orbitron font-black text-5xl sm:text-6xl lg:text-7xl mb-4 leading-tight"
            >
              <span className="neon-text">Thirushan</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-slate-300 mb-6 h-9">
              <Terminal size={20} className="text-cyan-400 flex-shrink-0" />
              <span>{typedText}</span>
              <span className="typing-cursor" />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
              BE Computer Science Engineering student passionate about building scalable
              web applications, blockchain solutions, and immersive digital experiences.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 mb-10">
              <button onClick={async () => {
                try {
                  const response = await fetch("http://localhost:8080/api/resume/download");
                  if (!response.ok) throw new Error("Resume not found");
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = url;
                  a.download = "THIRUSHAN-RESUME.pdf";
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                } catch (error) {
                  console.error("Error downloading resume:", error);
                  alert("Error downloading resume. Please make sure it is uploaded in the Admin Portal.");
                }
              }} className="btn-primary flex items-center gap-2 text-sm relative z-10">
                <Download size={16} /> Download Resume
              </button>
              <a href="https://github.com/thirushan2007" target="_blank" rel="noreferrer"
                className="btn-outline flex items-center gap-2 text-sm">
                <GithubIcon size={16} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/thirushan-s-r-a52532388/" target="_blank" rel="noreferrer"
                className="btn-outline flex items-center gap-2 text-sm border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500">
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="flex gap-8">
              {[{ val: '10+', label: 'Projects' }, { val: '5+', label: 'Technologies' }, { val: '1+', label: 'Year Exp.' }].map(stat => (
                <div key={stat.label}>
                  <p className="font-orbitron font-bold text-2xl neon-text">{stat.val}</p>
                  <p className="text-slate-500 text-xs">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right – 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[450px] lg:h-[600px]"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
              </div>
            }>
              <HeroScene />
            </Suspense>
            <FloatingIcon icon="⚛️" style={{ top: '10%', left: '-5%' }} />
            <FloatingIcon icon="☕" style={{ top: '20%', right: '0%' }} />
            <FloatingIcon icon="🔷" style={{ bottom: '20%', left: '0%' }} />
            <FloatingIcon icon="🌿" style={{ bottom: '10%', right: '5%' }} />
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-slate-500 text-xs">Scroll down</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={20} className="text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
