import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, X } from 'lucide-react';
import { GithubIcon } from '../components/common/SocialIcons';
import { projectService } from '../services/portfolioService';
import { Project } from '../types';
import { ProjectCardSkeleton } from '../components/common/LoadingSkeleton';

const staticProjects: Project[] = [
  {
    id: '1',
    title: 'Digital Evidence Integrity System',
    description: 'Blockchain-based digital evidence verification system using SHA-256 hashing, MongoDB, Firebase, and blockchain anchoring.',
    longDescription: 'A comprehensive blockchain-powered platform ensuring immutability and verifiability of digital evidence. Uses SHA-256 cryptographic hashing combined with blockchain anchoring to create tamper-proof audit trails. Integrates MongoDB for metadata storage and Firebase for real-time file management.',
    techStack: ['Solidity', 'React', 'Spring Boot', 'MongoDB', 'Firebase', 'Hardhat', 'Ethers.js'],
    githubLink: 'https://github.com',
    category: 'Blockchain',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',
    featured: true,
  },
  {
    id: '2',
    title: 'Productive Task Manager',
    description: 'Full-featured task management system using React, Spring Boot, and database integration with real-time updates.',
    longDescription: 'A productivity-focused task management application with features like task categorization, priority levels, progress tracking, and team collaboration.',
    techStack: ['React', 'TypeScript', 'Spring Boot', 'MongoDB', 'Tailwind CSS'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80',
    featured: true,
  },
  {
    id: '3',
    title: 'Flipkart Clone',
    description: 'E-commerce frontend clone built with React, featuring responsive UI, product listing, cart, and order flow.',
    longDescription: 'A pixel-perfect Flipkart clone featuring product browsing, search functionality, cart management, wishlist, and a complete checkout flow.',
    techStack: ['React', 'JavaScript', 'CSS', 'Redux'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    category: 'Frontend',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
  },
  {
    id: '4',
    title: 'Weather Detection App',
    description: 'Real-time weather application using OpenWeather API with geolocation, 5-day forecast, and beautiful UI.',
    longDescription: 'A weather application that provides real-time weather data, hourly forecasts, 5-day predictions, and location-based weather detection.',
    techStack: ['React', 'JavaScript', 'OpenWeather API', 'CSS3'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    category: 'Frontend',
    imageUrl: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=600&q=80',
  },
];

const categories = ['All', 'Full Stack', 'Frontend', 'Blockchain', 'Mobile'];

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="modal-overlay p-4" onClick={onClose}>
    <motion.div initial={{ scale: 0.8, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 40 }}
      className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="w-full h-52 object-cover rounded-t-2xl" />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs px-2 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 mb-2 inline-block">{project.category}</span>
            <h2 className="font-orbitron font-bold text-2xl text-white">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg glass hover:bg-white/10 transition-colors text-slate-400"><X size={20} /></button>
        </div>
        <p className="text-slate-300 leading-relaxed mb-6">{project.longDescription || project.description}</p>
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3 text-sm">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 text-sm">
              <GithubIcon size={16} /> GitHub
            </a>
          )}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2 text-sm">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'none';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="glass-card overflow-hidden cursor-pointer group"
      style={{ transition: 'transform 0.2s ease, box-shadow 0.3s ease' }}
      onClick={onClick}>
      {project.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
          {project.featured && (
            <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/50 text-cyan-400 text-xs">Featured</span>
          )}
        </div>
      )}
      <div className="p-5">
        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">{project.category}</span>
        <h3 className="font-orbitron font-bold text-white text-lg mt-3 mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10 text-slate-400">{t}</span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10 text-slate-500">+{project.techStack.length - 4}</span>
          )}
        </div>
        <div className="flex gap-3">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
              <GithubIcon size={14} /> Code
            </a>
          )}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [filtered, setFiltered] = useState<Project[]>(staticProjects);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getAll()
      .then(res => { if (res.data.length > 0) setProjects(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let data = projects;
    if (category !== 'All') data = data.filter(p => p.category === category);
    if (search) data = data.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(data);
  }, [projects, category, search]);

  return (
    <div className="relative min-h-screen bg-dark pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-orbitron font-black text-4xl sm:text-5xl mb-4 neon-text">Projects</h1>
          <p className="text-slate-400 max-w-xl mx-auto">A collection of things I've built</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search projects, technologies..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 glass border border-slate-700 rounded-xl bg-transparent text-slate-300 placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none text-sm" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  category === cat
                    ? 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-400'
                    : 'glass border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProjectCardSkeleton /><ProjectCardSkeleton /><ProjectCardSkeleton />
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-6">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map(p => <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />)}
              </AnimatePresence>
              {filtered.length === 0 && (
                <div className="col-span-3 py-20 text-center">
                  <p className="text-slate-500 text-lg">No projects found</p>
                  <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-4 btn-outline text-sm">Clear filters</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
