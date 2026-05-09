import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';

import HeroSection     from './components/sections/HeroSection';
import AboutSection    from './components/sections/AboutSection';
import SkillsSection   from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ContactSection  from './components/sections/ContactSection';
import AdminDashboard  from './pages/AdminDashboard';
import AdminLoginPage  from './pages/AdminLoginPage';
import { useAuth } from './context/AuthContext';

/* ── Protected Route Wrapper ── */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

/* ── Main portfolio page ── */
const PortfolioPage: React.FC = () => (
  <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
    <footer style={{ borderTop: '1px solid rgba(0,212,255,0.07)', padding: '24px 0', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--t3)', letterSpacing: '0.08em' }}>
        © {new Date().getFullYear()} Thirushan &nbsp;·&nbsp; Built with React &amp; Spring Boot
      </p>
    </footer>
  </div>
);

const App: React.FC = () => (
  <HashRouter>
    <AuthProvider>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<PortfolioPage />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(5,5,8,0.96)',
            color: 'var(--t1)',
            border: '1px solid rgba(0,212,255,0.18)',
            borderRadius: '10px',
            backdropFilter: 'blur(20px)',
            fontSize: '13px',
            fontFamily: 'var(--font)',
          },
          success: { iconTheme: { primary: '#00d4ff', secondary: '#050508' } },
          error:   { iconTheme: { primary: '#f87171', secondary: '#050508' } },
        }}
      />
    </AuthProvider>
  </HashRouter>
);

export default App;
