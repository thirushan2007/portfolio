import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';
import { skillService } from '../../services/portfolioService';
import ShapeGrid from '../../styles/ShapeGrid';

const DEFAULT_SKILLS: any[] = [
  { name: 'React',      category: 'Frontend',   color: '#61DAFB', bg: '#061822' },
  { name: 'TypeScript', category: 'Frontend',   color: '#3178C6', bg: '#06101e' },
  { name: 'Tailwind',   category: 'Frontend',   color: '#38BDF8', bg: '#061520' },
  { name: 'Java',       category: 'Backend',    color: '#ED8B00', bg: '#180e00' },
  { name: 'Spring',     category: 'Backend',    color: '#6DB33F', bg: '#061506' },
  { name: 'Node.js',    category: 'Backend',    color: '#339933', bg: '#061206' },
  { name: 'MongoDB',    category: 'Database',   color: '#47A248', bg: '#061506' },
  { name: 'MySQL',      category: 'Database',   color: '#00758F', bg: '#061216' },
  { name: 'Solidity',   category: 'Blockchain', color: '#A0AEC0', bg: '#10101a' },
  { name: 'Flutter',    category: 'Mobile',     color: '#54C5F8', bg: '#061820' },
  { name: 'Docker',     category: 'DevOps',     color: '#2496ED', bg: '#06121e' },
  { name: 'Git',        category: 'DevOps',     color: '#F05032', bg: '#180806' },
];

/* ── Physics-enhanced floating ball ── */
interface BallState {
  id: number;
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  skill: any;
  angle: number;
  floatSpeed: number;
  floatAmp: number;
  grabbed: boolean;
  grabDx: number; grabDy: number;
  img?: HTMLImageElement;
}

const GRAVITY = 0.12;
const DAMPING = 0.7;
const FRICTION = 0.994;
const REPULSE = 2.0;

const PhysicsBalls: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balls = useRef<BallState[]>([]);
  const grabbed = useRef<BallState | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const gravityActive = useRef(false);

  const buildBalls = (W: number, H: number) => {
    balls.current = skills.map((skill: any, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const rx = W * 0.36, ry = H * 0.3;
      const cx = W / 2 + Math.cos(angle) * rx;
      const cy = H / 2 + Math.sin(angle) * ry;
      const r = 54;
      
      const b: BallState = {
        id: i, x: cx, y: cy,
        vx: (Math.random() - 0.5) * 2.5, vy: (Math.random() - 0.5) * 2.5,
        r, skill,
        angle, floatSpeed: 0.5 + Math.random() * 0.5,
        floatAmp: 8 + Math.random() * 10,
        grabbed: false, grabDx: 0, grabDy: 0,
      };

      // Load image directly from the base64 string provided by the database
      if (skill.icon && skill.icon.startsWith('data:image')) {
        const img = new Image();
        img.src = skill.icon;
        b.img = img;
      }
      return b;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildBalls(canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    /* pointer */
    const getXY = (e: MouseEvent | TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const src = 'touches' in e ? (e as TouchEvent).touches[0] : e as MouseEvent;
      return { x: src.clientX - r.left, y: src.clientY - r.top };
    };
    const onDown = (e: MouseEvent | TouchEvent) => {
      gravityActive.current = true;
      const { x, y } = getXY(e);
      mouse.current = { x, y };
      let best: BallState | null = null, bd = Infinity;
      for (const b of balls.current) {
        const d = Math.hypot(b.x - x, b.y - y);
        if (d < b.r + 8 && d < bd) { best = b; bd = d; }
      }
      if (best) { best.grabbed = true; best.vx = best.vy = 0; best.grabDx = best.x - x; best.grabDy = best.y - y; grabbed.current = best; }
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      const { x, y } = getXY(e);
      const prev = { ...mouse.current };
      mouse.current = { x, y };
      const b = grabbed.current;
      if (b?.grabbed) {
        gravityActive.current = true;
        b.vx = (x - prev.x) * 1.5; b.vy = (y - prev.y) * 1.5; b.x = x + b.grabDx; b.y = y + b.grabDy;
      }
    };
    const onUp = () => { if (grabbed.current) { grabbed.current.grabbed = false; grabbed.current = null; } };

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    /* draw loop */
    const ctx = canvas.getContext('2d')!;
    let t = 0;
    const tick = () => {
      t += 0.016;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const b of balls.current) {
        if (!b.grabbed) {
          // gentle float logic
          const spd = Math.hypot(b.vx, b.vy);
          if (spd < 1.0) {
            b.y += Math.sin(t * b.floatSpeed + b.angle) * 0.4;
            b.x += Math.cos(t * b.floatSpeed * 0.7 + b.angle) * 0.15;
          }

          if (gravityActive.current) {
            b.vy += GRAVITY;
          }

          b.vx *= FRICTION; b.vy *= FRICTION;
          b.x += b.vx; b.y += b.vy;
          if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -DAMPING; b.vx *= 0.85; }
          if (b.y - b.r < 0) { b.y = b.r; b.vy *= -DAMPING; }
          if (b.x - b.r < 0) { b.x = b.r; b.vx *= -DAMPING; }
          if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -DAMPING; }
        }
      }
      // collisions
      for (let i = 0; i < balls.current.length; i++) {
        for (let j = i + 1; j < balls.current.length; j++) {
          const a = balls.current[i], bj = balls.current[j];
          const dx = bj.x - a.x, dy = bj.y - a.y;
          const dist = Math.hypot(dx, dy), minD = a.r + bj.r;
          if (dist < minD && dist > 0) {
            const nx = dx / dist, ny = dy / dist, ov = (minD - dist) / 2;
            if (!a.grabbed) { a.x -= nx * ov; a.y -= ny * ov; }
            if (!bj.grabbed) { bj.x += nx * ov; bj.y += ny * ov; }
            const dot = (a.vx - bj.vx) * nx + (a.vy - bj.vy) * ny;
            if (dot > 0) {
              const imp = dot * REPULSE / 2;
              if (!a.grabbed) { a.vx -= imp * nx; a.vy -= imp * ny; }
              if (!bj.grabbed) { bj.vx += imp * nx; bj.vy += imp * ny; }
            }
          }
        }
      }

      /* draw each ball */
      for (const b of balls.current) {
        const { x, y, r, skill } = b;
        const col = skill.color || '#00d4ff';
        const bg = skill.bg || '#060610';

        // outer glow
        const glow = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 1.6);
        glow.addColorStop(0, col + '22'); glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(x, y, r * 1.6, 0, Math.PI * 2); ctx.fill();

        // body
        const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.05, x, y, r);
        grad.addColorStop(0, bg + 'ee'); grad.addColorStop(1, bg + 'cc');
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = col + '50'; ctx.lineWidth = 1.5; ctx.stroke();

        // inner highlight
        const hl = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, 0, x - r * 0.2, y - r * 0.3, r * 0.55);
        hl.addColorStop(0, 'rgba(255,255,255,0.13)'); hl.addColorStop(1, 'transparent');
        ctx.fillStyle = hl; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();

        // Icon (Image or Emoji)
        if (b.img && b.img.complete && b.img.naturalWidth > 0) {
          const imgSize = r * 0.7; // Smaller image size to fit perfectly
          ctx.drawImage(b.img, x - imgSize / 2, y - imgSize / 2 - r * 0.15, imgSize, imgSize);
        } else {
          ctx.font = `${r * 0.5}px serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(typeof skill.icon === 'string' ? skill.icon : '⚙️', x, y - r * 0.15);
        }

        // name
        ctx.font = `600 ${Math.max(9, r * 0.21)}px 'JetBrains Mono',monospace`;
        ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText(skill.name, x, y + r * 0.36);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills]);

  return (
    <canvas ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }} />
  );
};

const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);

  useEffect(() => {
    skillService.getAll()
      .then(res => { if (res.data?.length > 0) setSkills(res.data); })
      .catch(() => { });
  }, []);

  return (
    <section id="skills" className="section relative overflow-hidden" style={{ background: 'var(--bg-2)' }}>
      {/* Background Shape Grid */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 1, pointerEvents: 'none' }}>
        <ShapeGrid
          direction="diagonal"
          speed={0.6}
          squareSize={40}
          borderColor="#FFFDD0"
          hoverFillColor="#B22222"
          shape="hexagon"
          hoverTrailAmount={6}
        />
      </div>

      <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.035) 0%, transparent 70%)' }} />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.035) 0%, transparent 70%)' }} />

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginBottom: 48,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
            padding: '24px 32px',
            borderRadius: 'var(--r)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
          <p className="label-tag" style={{ marginBottom: 10, textShadow: '0 2px 10px rgba(0,0,0,1)' }}>02 — SKILLS</p>
          <h2 className="h1" style={{ textShadow: '0 4px 20px rgba(0,0,0,1)' }}>Tech Arsenal</h2>
          <div className="divider" />
          <p className="body" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Drag, toss and play — technologies I work with daily</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            position: 'relative', height: 400, borderRadius: 16, overflow: 'hidden',
            border: '1px solid rgba(0,212,255,0.08)',
            background: 'rgba(0,0,0,0.22)', backdropFilter: 'blur(4px)',
          }}>
          <PhysicsBalls skills={skills} />
          <div style={{
            position: 'absolute', bottom: 14, right: 16,
            fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(0,212,255,0.35)', letterSpacing: '0.12em',
          }}>DRAG TO PLAY</div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
