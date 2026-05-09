import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, ExternalLink, X, Eye } from 'lucide-react';
import { certificateService } from '../services/portfolioService';
import { Certificate } from '../types';

const staticCerts: Certificate[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    issuer: 'Udemy',
    date: '2023',
    description: 'Comprehensive course covering React, Node.js, MongoDB, and REST APIs.',
    credentialUrl: 'https://udemy.com',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80',
  },
  {
    id: '2',
    title: 'Blockchain Developer Certification',
    issuer: 'Coursera',
    date: '2024',
    description: 'Smart contract development with Solidity, Hardhat, and Ethereum.',
    credentialUrl: 'https://coursera.org',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80',
  },
  {
    id: '3',
    title: 'Java Programming Masterclass',
    issuer: 'Udemy',
    date: '2023',
    description: 'Core Java, OOP, data structures, algorithms, and Spring Boot.',
    credentialUrl: 'https://udemy.com',
    imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&q=80',
  },
  {
    id: '4',
    title: 'React – The Complete Guide',
    issuer: 'Udemy',
    date: '2023',
    description: 'React fundamentals, hooks, context, Redux, and React Router.',
    credentialUrl: 'https://udemy.com',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80',
  },
  {
    id: '5',
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS',
    date: '2024',
    description: 'Cloud fundamentals, AWS core services, security, and pricing.',
    credentialUrl: 'https://aws.amazon.com',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
  },
  {
    id: '6',
    title: 'Docker & Kubernetes Essentials',
    issuer: 'Udemy',
    date: '2024',
    description: 'Containerization, Docker Compose, Kubernetes orchestration.',
    credentialUrl: 'https://udemy.com',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
  },
];

const CertCard: React.FC<{ cert: Certificate; onView: () => void }> = ({ cert, onView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flip-card h-72 cursor-pointer"
    onClick={onView}
  >
    <div className="flip-card-inner">
      {/* Front */}
      <div className="flip-card-front glass-card flex flex-col items-center justify-center p-6 text-center">
        {cert.imageUrl ? (
          <img src={cert.imageUrl} alt={cert.title} className="w-full h-32 object-cover rounded-xl mb-4" />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-4">
            <Award size={32} className="text-white" />
          </div>
        )}
        <h3 className="font-orbitron font-bold text-white text-sm mb-1 line-clamp-2">{cert.title}</h3>
        <p className="text-cyan-400 text-xs">{cert.issuer}</p>
        <p className="text-slate-500 text-xs mt-1">{cert.date}</p>
        <p className="text-slate-600 text-xs mt-3">Hover to flip ↺</p>
      </div>

      {/* Back */}
      <div className="flip-card-back bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/30 flex flex-col items-center justify-center p-6 text-center gap-4">
        <Award size={36} className="text-cyan-400" />
        <div>
          <h3 className="font-orbitron font-bold text-white text-sm mb-2">{cert.title}</h3>
          {cert.description && <p className="text-slate-400 text-xs leading-relaxed mb-3">{cert.description}</p>}
        </div>
        <div className="flex gap-3">
          <button onClick={(e) => { e.stopPropagation(); onView(); }}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-cyan-400/20 border border-cyan-400/40 text-cyan-400 text-xs hover:bg-cyan-400/30 transition-all">
            <Eye size={12} /> View
          </button>
          {cert.credentialUrl && (
            <a href={cert.credentialUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs hover:bg-purple-500/30 transition-all">
              <ExternalLink size={12} /> Verify
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const CertModal: React.FC<{ cert: Certificate; onClose: () => void }> = ({ cert, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="modal-overlay p-4" onClick={onClose}>
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
      className="glass-card max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
      {cert.imageUrl && (
        <img src={cert.imageUrl} alt={cert.title} className="w-full h-56 object-cover rounded-t-2xl" />
      )}
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-cyan-400 text-xs mb-1">{cert.issuer} · {cert.date}</p>
            <h2 className="font-orbitron font-bold text-white text-xl">{cert.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg glass text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        {cert.description && <p className="text-slate-400 text-sm leading-relaxed mb-6">{cert.description}</p>}
        <div className="flex gap-3">
          {cert.credentialUrl && (
            <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2 text-sm">
              <ExternalLink size={14} /> Verify Credential
            </a>
          )}
          <button className="btn-outline flex items-center gap-2 text-sm">
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const CertificatesPage: React.FC = () => {
  const [certs, setCerts] = useState<Certificate[]>(staticCerts);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    certificateService.getAll()
      .then(res => { if (res.data.length > 0) setCerts(res.data); })
      .catch(() => {});
  }, []);

  return (
    <div className="relative min-h-screen bg-dark pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-orbitron font-black text-4xl sm:text-5xl mb-4 neon-text">Certificates</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Credentials earned through continuous learning</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <CertCard key={cert.id} cert={cert} onView={() => setSelected(cert)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default CertificatesPage;
