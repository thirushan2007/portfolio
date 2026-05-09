import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Box, MeshWobbleMaterial } from '@react-three/drei';
import { GraduationCap, Code, Cpu, Heart, MapPin, Mail } from 'lucide-react';

const ProfileCube: React.FC = () => (
  <Canvas camera={{ position: [0, 0, 4], fov: 60 }} style={{ width: '100%', height: '100%' }}>
    <ambientLight intensity={0.8} />
    <directionalLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
    <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#bf5af2" />
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
      <Box args={[2, 2, 2]}>
        <MeshWobbleMaterial color="#00d4ff" factor={0.3} speed={2} metalness={0.8} roughness={0.1} />
      </Box>
    </Float>
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
  </Canvas>
);

const educationData = [
  {
    degree: 'B.E. Computer Science Engineering',
    institution: 'Sri Venkateswara College of Engineering',
    duration: '2024 – 2028',
    grade: 'CGPA: 8.34',
    description: 'Specialized in algorithms, data structures, web technologies, and blockchain.',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'State Board – Tamil Nadu',
    duration: '2023 – 2024',
    grade: '92%',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'State Board – Tamil Nadu',
    duration: '2021 – 2022',
    grade: '95%',
  },
];

const interests = [
  { icon: Code, label: 'Full Stack Development', color: 'text-cyan-400' },
  { icon: Cpu, label: 'Blockchain & Web3', color: 'text-purple-400' },
  { icon: Heart, label: 'Open Source', color: 'text-pink-400' },
  { icon: GraduationCap, label: 'Continuous Learning', color: 'text-green-400' },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage: React.FC = () => (
  <div className="relative min-h-screen bg-dark pt-24 pb-16 overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="text-center mb-16">
        <h1 className="font-orbitron font-black text-4xl sm:text-5xl mb-4 neon-text">About Me</h1>
        <p className="text-slate-400 max-w-xl mx-auto">A passionate developer crafting digital experiences</p>
      </motion.div>

      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        {/* 3D Card */}
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="relative h-80 lg:h-96">
          <div className="glass-card h-full overflow-hidden">
            <ProfileCube />
          </div>
          <div className="absolute -bottom-4 -right-4 glass border border-cyan-400/30 rounded-2xl px-6 py-4">
            <p className="font-orbitron text-2xl font-bold neon-text">1+</p>
            <p className="text-slate-400 text-xs">Years of Experience</p>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="font-orbitron font-bold text-3xl text-white mb-4">
            Hi, I'm <span className="neon-text">Thirushan</span>
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            I'm a <span className="text-cyan-400 font-semibold">Full Stack Developer</span> and
            <span className="text-purple-400 font-semibold"> Blockchain Enthusiast</span> currently pursuing
            my BE in Computer Science Engineering. I love building end-to-end web applications
            that solve real-world problems.
          </p>
          <p className="text-slate-400 leading-relaxed mb-6">
            My passion lies at the intersection of traditional web development and emerging blockchain
            technologies. I thrive on learning new skills and applying them to create impactful projects.
          </p>

          {/* Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={16} className="text-cyan-400 flex-shrink-0" />
              <span className="text-slate-300">Tamil Nadu, India</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-purple-400 flex-shrink-0" />
              <span className="text-slate-300">s.r.thirushan2002@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <GraduationCap size={16} className="text-pink-400 flex-shrink-0" />
              <span className="text-slate-300">B.E. Computer Science Engineering</span>
            </div>
          </div>

          {/* Interests */}
          <div className="grid grid-cols-2 gap-3">
            {interests.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 glass border border-slate-700/50 rounded-lg px-3 py-2">
                <Icon size={16} className={color} />
                <span className="text-slate-300 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Career Objective */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7 }} className="glass-card p-8 mb-16">
        <h2 className="font-orbitron font-bold text-2xl text-white mb-4">
          Career <span className="neon-text">Objective</span>
        </h2>
        <p className="text-slate-300 leading-relaxed text-lg">
          To leverage my expertise in full-stack development and blockchain technology to build
          innovative, scalable solutions. I aim to contribute to a dynamic team where I can grow
          professionally while making meaningful impacts through cutting-edge technology.
          Seeking opportunities in software development, blockchain projects, and emerging tech.
        </p>
      </motion.div>

      {/* Education Timeline */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <h2 className="font-orbitron font-bold text-3xl text-white mb-10 text-center">
          Education <span className="neon-text">Timeline</span>
        </h2>
        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 md:transform md:-translate-x-1/2" />
          <div className="space-y-10">
            {educationData.map((edu, i) => (
              <motion.div key={i} variants={item}
                className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-cyan-400 border-2 border-dark transform -translate-x-1/2 mt-2 z-10" />
                {/* Spacer */}
                <div className="hidden md:block flex-1" />
                {/* Card */}
                <div className="ml-12 md:ml-0 md:w-5/12 glass-card p-6">
                  <span className="text-xs font-mono-code text-cyan-400">{edu.duration}</span>
                  <h3 className="font-semibold text-white text-lg mt-1 mb-1">{edu.degree}</h3>
                  <p className="text-slate-400 text-sm mb-2">{edu.institution}</p>
                  {edu.grade && (
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs">
                      {edu.grade}
                    </span>
                  )}
                  {edu.description && <p className="text-slate-500 text-xs mt-2">{edu.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default AboutPage;
