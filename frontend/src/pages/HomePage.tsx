import React from 'react';
import ParticleBackground from '../components/home/ParticleBackground';
import HeroSection from '../components/home/HeroSection';

const HomePage: React.FC = () => (
  <div className="relative min-h-screen bg-dark overflow-hidden">
    <ParticleBackground />
    <div className="relative z-10">
      <HeroSection />
    </div>
  </div>
);

export default HomePage;
