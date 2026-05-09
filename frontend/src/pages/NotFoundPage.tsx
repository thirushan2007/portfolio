import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-20" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-3xl" />

    <div className="relative z-10 text-center px-4">
      {/* Glitch 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="mb-6"
      >
        <h1 className="font-orbitron font-black text-[120px] sm:text-[180px] leading-none neon-text select-none"
          style={{ textShadow: '0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.2)' }}>
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="glass-card inline-block px-6 py-3 mb-6">
          <p className="font-mono-code text-cyan-400 text-sm">
            <span className="text-slate-500">Error:</span> Page not found in this dimension
          </p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">Oops! Lost in the Matrix</h2>
        <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
          The page you're looking for has vanished into the digital void.
          Let's get you back to the real world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center gap-2 justify-center">
            <Home size={16} /> Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>

      {/* Animated floating elements */}
      {['01', '10', '00', '11'].map((bit, i) => (
        <motion.span
          key={i}
          className="absolute font-mono-code text-cyan-400/20 text-2xl font-bold select-none pointer-events-none"
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 2) * 50}%`,
          }}
        >
          {bit}
        </motion.span>
      ))}
    </div>
  </div>
);

export default NotFoundPage;
