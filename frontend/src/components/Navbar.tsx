import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';


const links = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const Navbar: React.FC = () => {

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 36);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      for (const l of [...links].reverse()) {
        const el = document.getElementById(l.id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(l.id); break; }
      }
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
          background: scrolled ? 'rgba(26,26,26,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(178,34,34,0.15)' : 'none',
          transition: 'all 0.4s ease',
        }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>

          {/* Logo */}
          <button onClick={() => go('home')}
            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,var(--crimson),var(--olive))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--din)', fontWeight: 800, fontSize: 14, color: '#F0EAE0' }}>T</span>
            </div>
            <span style={{ fontFamily: 'var(--din)', fontWeight: 700, fontSize: 17, color: 'var(--t1)', letterSpacing: '0.02em' }}>
              THIRUSHAN<span style={{ color: 'var(--neon)' }}>.</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden md:flex">
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)}
                style={{
                  position: 'relative', padding: '8px 14px', borderRadius: 8,
                  background: 'none', border: 'none',
                  fontFamily: 'var(--din)', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em',
                  color: active === l.id ? 'var(--neon)' : 'var(--t2)',
                  transition: 'color 0.25s',
                }}>
                {active === l.id && (
                  <motion.span layoutId="nav-bg"
                    style={{ position: 'absolute', inset: 0, borderRadius: 8, background: 'rgba(178,34,34,0.07)', border: '1px solid rgba(178,34,34,0.2)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{l.label}</span>
              </button>
            ))}
          </nav>

          {/* CTA + toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

            <button onClick={() => setOpen(!open)} className="md:hidden"
              style={{ background: 'none', border: 'none', color: 'var(--t2)', padding: 4 }}>
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden"
              style={{ background: 'rgba(8,8,8,0.97)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ padding: '12px 24px 16px' }}>
                {links.map(l => (
                  <button key={l.id} onClick={() => go(l.id)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 12px', borderRadius: 8, border: 'none',
                      fontFamily: 'var(--font)', fontSize: 13, fontWeight: 500,
                      background: active === l.id ? 'rgba(178,34,34,0.07)' : 'transparent',
                      color: active === l.id ? 'var(--neon)' : 'var(--t2)',
                      marginBottom: 2,
                    }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
