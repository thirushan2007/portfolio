import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../SocialIcons';
import { contactService } from '../../services/portfolioService';
import { ContactMessage } from '../../types';
import toast from 'react-hot-toast';
import FaultyTerminal from '../../styles/FaultyTerminal';

const EMPTY: ContactMessage = { name: '', email: '', subject: '', message: '' };

const ContactSection: React.FC = () => {
  const [form, setForm] = useState<ContactMessage>(EMPTY);
  const [sending, setSending] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Fill all required fields'); return; }
    setSending(true);
    try {
      await contactService.send(form);
      toast.success("Sent! I'll reply soon ✓");
      setForm(EMPTY);
    } catch { toast.error('Failed — please try again.'); }
    finally { setSending(false); }
  };

  return (
    <section id="contact" className="section relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Background Faulty Terminal */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15, pointerEvents: 'none' }}>
        <FaultyTerminal
          tint="#FFFDD0"
          glitchAmount={0.3}
          mouseReact={true}
          scale={1.5}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 40% at 50% 100%, rgba(0,200,255,0.06) 0%, transparent 70%)' }} />

      <div className="container relative z-10" style={{ maxWidth: 760 }}>
        {/* Heading — compact */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            marginBottom: 36,
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
            padding: '24px 32px',
            borderRadius: 'var(--r)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
          <p className="label-tag" style={{ marginBottom: 8, textShadow: '0 2px 10px rgba(0,0,0,1)' }}>05 — CONTACT</p>
          <h2 className="h1" style={{ textShadow: '0 4px 20px rgba(0,0,0,1)' }}>Get In Touch</h2>
          <div className="divider" style={{ margin: '12px auto' }} />
          <p className="body" style={{ fontSize: 13, textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Let's build something great together</p>
        </motion.div>

        {/* Quick links row */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
          {[
            { icon: Mail, label: 's.r.thirushan2002@gmail.com', href: 'mailto:s.r.thirushan2002@gmail.com' },
            { icon: GithubIcon, label: 'github.com/thirushan', href: 'https://github.com/thirushan2007' },
            { icon: LinkedinIcon, label: 'linkedin.com/in/thirushan', href: 'https://www.linkedin.com/in/thirushan-s-r-a52532388/' },
            { icon: MapPin, label: 'Tamil Nadu, India', href: '#' },
          ].map(({ icon: Icon, label, href }) => (
            <motion.a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer"
              whileHover={{ y: -2 }}
              className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 9, textDecoration: 'none' }}>
              <Icon size={13} style={{ color: 'var(--neon)', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'var(--t2)', fontFamily: 'var(--mono)' }}>{label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.15 }} className="glass" style={{ padding: '28px 28px', borderRadius: 14 }}>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
              className="grid-cols-1 sm:grid-cols-2">
              <div>
                <p className="label-tag" style={{ marginBottom: 6, fontSize: '9px' }}>NAME *</p>
                <input name="name" value={form.name} onChange={onChange} placeholder="Your name" className="input" />
              </div>
              <div>
                <p className="label-tag" style={{ marginBottom: 6, fontSize: '9px' }}>EMAIL *</p>
                <input name="email" type="email" value={form.email} onChange={onChange} placeholder="your@email.com" className="input" />
              </div>
            </div>
            <div>
              <p className="label-tag" style={{ marginBottom: 6, fontSize: '9px' }}>SUBJECT</p>
              <input name="subject" value={form.subject || ''} onChange={onChange} placeholder="What's it about?" className="input" />
            </div>
            <div>
              <p className="label-tag" style={{ marginBottom: 6, fontSize: '9px' }}>MESSAGE *</p>
              <textarea name="message" value={form.message} onChange={onChange} rows={4}
                placeholder="Tell me about your project or idea…" className="input" style={{ resize: 'none' }} />
            </div>
            <motion.button type="submit" disabled={sending}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="btn btn-solid" style={{ justifyContent: 'center', padding: '11px', opacity: sending ? 0.6 : 1 }}>
              {sending
                ? <><div style={{ width: 13, height: 13, borderRadius: '50%', border: '2px solid rgba(8,8,8,0.4)', borderTopColor: '#080808', animation: 'spin 0.6s linear infinite' }} /> Sending…</>
                : <><Send size={13} /> Send Message</>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
