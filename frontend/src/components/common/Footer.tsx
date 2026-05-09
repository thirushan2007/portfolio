import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Code2, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-cyan-400/10 bg-dark-card/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="font-orbitron font-bold text-lg neon-text">Thirushan</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Full Stack Developer & Blockchain Enthusiast building the future one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Certificates', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-lg glass border border-cyan-400/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/50 transition-all duration-300">
                <GithubIcon size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-lg glass border border-purple-500/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition-all duration-300">
                <LinkedinIcon size={18} />
              </a>
              <a href="mailto:s.r.thirushan2002@gmail.com"
                className="w-10 h-10 rounded-lg glass border border-pink-500/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500/50 transition-all duration-300">
                <Mail size={18} />
              </a>
            </div>
            <p className="text-slate-500 text-xs mt-6">
              Available for freelance & full-time opportunities.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">© {year} Thirushan. All rights reserved.</p>
          <p className="text-slate-500 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-pink-500 fill-pink-500" /> using React & Spring Boot
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
