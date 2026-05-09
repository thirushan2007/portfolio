import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/common/SocialIcons';
import { contactService } from '../services/portfolioService';
import { ContactMessage } from '../types';
import toast from 'react-hot-toast';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 's.r.thirushan2002@gmail.com', href: 'mailto:s.r.thirushan2002@gmail.com', color: '#00d4ff' },
  { icon: GithubIcon, label: 'GitHub', value: 'github.com/thirushan', href: 'https://github.com/thirushan2007', color: '#94a3b8' },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'linkedin.com/in/thirushan', href: 'https://www.linkedin.com/in/thirushan-s-r-a52532388/', color: '#0ea5e9' },
  { icon: MapPin, label: 'Location', value: 'Tamil Nadu, India', href: '#', color: '#bf5af2' },
];

const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactMessage>({ name: '', email: '', message: '', subject: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSending(true);
    try {
      await contactService.send(form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: '', email: '', message: '', subject: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-dark pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-orbitron font-black text-4xl sm:text-5xl mb-4 neon-text">Get In Touch</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Have a project in mind? Let's build something amazing together.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6 mb-6">
              <h2 className="font-orbitron font-bold text-xl text-white mb-2">Let's Connect</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm always open to new opportunities, collaborations, or a friendly conversation about technology.
              </p>
            </div>
            {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
              <motion.a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer"
                whileHover={{ x: 4, scale: 1.02 }}
                className="flex items-center gap-4 glass-card p-4 group block">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}40` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs">{label}</p>
                  <p className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            className="lg:col-span-3">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare size={20} className="text-cyan-400" />
                <h2 className="font-orbitron font-bold text-xl text-white">Send a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-400 text-xs mb-2 uppercase tracking-wider">Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name"
                      className="w-full px-4 py-3 glass border border-slate-700 rounded-xl bg-transparent text-slate-300 placeholder-slate-600 focus:border-cyan-400/50 focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-2 uppercase tracking-wider">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                      className="w-full px-4 py-3 glass border border-slate-700 rounded-xl bg-transparent text-slate-300 placeholder-slate-600 focus:border-cyan-400/50 focus:outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-2 uppercase tracking-wider">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry, collaboration..."
                    className="w-full px-4 py-3 glass border border-slate-700 rounded-xl bg-transparent text-slate-300 placeholder-slate-600 focus:border-cyan-400/50 focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-2 uppercase tracking-wider">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={6}
                    className="w-full px-4 py-3 glass border border-slate-700 rounded-xl bg-transparent text-slate-300 placeholder-slate-600 focus:border-cyan-400/50 focus:outline-none text-sm resize-none" />
                </div>
                <motion.button type="submit" disabled={sending}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                  {sending ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
