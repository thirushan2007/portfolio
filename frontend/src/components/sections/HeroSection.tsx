import React, { useRef, Component } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  Float,
  Stars,
  OrbitControls,
} from "@react-three/drei";
import { Download, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../SocialIcons";
import { useTypingAnimation } from "../../hooks/useCustomHooks";
import LineWaves from "../../styles/LineWaves";
import * as THREE from "three";

const roles = [
  "Full Stack Developer",
  "Java Developer",
  "Blockchain Engineer",
  "React Developer",
];

const InteractiveOrb = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const t = clock.elapsedTime;
    mesh.current.rotation.y += 0.006;
    mesh.current.rotation.x +=
      (mouse.current.y * 0.3 - mesh.current.rotation.x) * 0.05;
    mesh.current.position.y = Math.sin(t * 0.6) * 0.15;
  });

  return (
    <Float speed={0.8} floatIntensity={0.4}>
      <Sphere ref={mesh} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#00d4ff"
          distort={0.3}
          speed={1.5}
          metalness={0.95}
          roughness={0.08}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
};

class ErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { err: boolean }
> {
  state = { err: false };

  static getDerivedStateFromError() {
    return { err: true };
  }

  render() {
    return this.state.err ? this.props.fallback || null : this.props.children;
  }
}

const ThreeFallback = () => (
  <Canvas
    camera={{ position: [0, 0, 5.5], fov: 50 }}
    style={{ width: "100%", height: "100%" }}
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={0.15} />
    <pointLight position={[4, 4, 4]} intensity={3} color="#00d4ff" />
    <Stars
      radius={90}
      depth={60}
      count={2000}
      factor={3}
      saturation={0}
      fade
      speed={0.3}
    />
    <InteractiveOrb />
    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
  </Canvas>
);

const SplineHero = () => {
  const [err, setErr] = React.useState(false);

  if (err) return <ThreeFallback />;

  return (
    <iframe
      src="https://my.spline.design/c32c7fa7-d3af-489e-a3e1-7b3f23e5c80c/"
      title="3D Scene"
      allow="autoplay"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        background: "transparent",
      }}
      onError={() => setErr(true)}
    />
  );
};

const ProfileImage = () => (
  <div
    style={{
      position: "relative",
      width: 300,
      height: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: -30,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(178,34,34,0.18) 0%, rgba(212,255,0,0.06) 50%, transparent 70%)",
        filter: "blur(20px)",
      }}
    />

    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{
        position: "absolute",
        inset: -4,
        borderRadius: "50%",
        background:
          "conic-gradient(from 0deg, var(--crimson) 0%, transparent 30%, var(--neon) 55%, transparent 75%, var(--crimson) 100%)",
        padding: 3,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "var(--bg)",
        }}
      />
    </motion.div>

    <div
      style={{
        position: "relative",
        width: 282,
        height: 282,
        borderRadius: "50%",
        overflow: "hidden",
        background: "var(--bg-2)",
        border: "2px solid rgba(43,43,43,0.9)",
        zIndex: 1,
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/profile.png`}
        alt="Thirushan"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />
    </div>
  </div>
);

const HeroSection: React.FC = () => {
  const typed = useTypingAnimation(roles, 72, 2400);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    mouseX.set(((e.clientX - left) / width - 0.5) * 28);
    mouseY.set(((e.clientY - top) / height - 0.5) * -28);
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden grid-bg"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(178,34,34,0.15), transparent 40%), var(--bg)",
      }}
      onMouseMove={onMove}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.45,
          pointerEvents: "auto",
        }}
      >
        <LineWaves
          speed={0.3}
          innerLineCount={18}
          outerLineCount={18}
          warpIntensity={0.9}
          rotation={138}
          edgeFadeWidth={0.1}
          colorCycleSpeed={1}
          brightness={0.2}
          color1="#B22222"
          color2="#8B0000"
          color3="#D4FF00"
          enableMouseInteraction
          mouseInfluence={2}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse 50% 60% at 75% 50%, rgba(0,212,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse 40% 40% at 15% 75%, rgba(167,139,250,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="container relative z-10"
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: 40,
          paddingTop: 90,
          paddingBottom: 70,
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
              background: "rgba(178,34,34,0.08)",
              border: "1px solid rgba(178,34,34,0.25)",
              borderRadius: 100,
              padding: "5px 14px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 6px #4ade80",
              }}
            />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "var(--neon)",
              }}
            >
              OPEN TO WORK
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <motion.div style={{ x: springX, y: springY }}>
              <h1 className="display">
                Hi, I'm
                <br />
                <span
                  style={{
                    color: "var(--crimson)",
                    textShadow: "0 0 50px rgba(178,34,34,0.35)",
                  }}
                >
                  Thirushan.
                </span>
              </h1>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "var(--t2)",
              marginTop: 16,
              marginBottom: 14,
              minHeight: 26,
              fontFamily: "var(--mono)",
            }}
          >
            {typed}
            <span className="tcursor" />
          </motion.p>

          <motion.p
            className="body"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{
              maxWidth: 420,
              marginBottom: 32,
              lineHeight: 1.8,
            }}
          >
            BE CSE student building scalable web apps and blockchain solutions.
            Turning complex problems into clean, elegant code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 44,
            }}
          >
            <button
              onClick={async () => {
                try {
                  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
                  const response = await fetch(`${apiUrl}/resume/download`);
                  if (!response.ok) throw new Error("Resume not found");
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = url;
                  a.download = "THIRUSHAN-RESUME.pdf";
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                } catch (error) {
                  console.error("Error downloading resume:", error);
                  alert("Error downloading CV. Please ensure it is uploaded in the Admin Portal.");
                }
              }}
              className="btn btn-solid"
            >
              <Download size={13} /> Download CV
            </button>

            <a
              href="https://github.com/thirushan2007"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <GithubIcon size={13} /> GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/thirushan-s-r-a52532388/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <LinkedinIcon size={13} /> LinkedIn
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            style={{
              display: "flex",
              gap: 36,
            }}
          >
            {[
              { v: "10+", l: "Projects" },
              { v: "12+", l: "Tech Stack" },
              { v: "1+", l: "Yr. Exp." },
            ].map((s) => (
              <div key={s.l}>
                <p
                  style={{
                    fontFamily: "var(--din)",
                    fontWeight: 800,
                    fontSize: "2rem",
                    letterSpacing: "-0.02em",
                    color: "var(--neon)",
                    textShadow: "0 0 18px rgba(178,34,34,0.3)",
                  }}
                >
                  {s.v}
                </p>

                <p className="caption" style={{ marginTop: 2 }}>
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            minHeight: 420,
          }}
        >
          <ProfileImage />
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({
            behavior: "smooth",
          })
        }
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          background: "none",
          border: "none",
          zIndex: 10,
          color: "var(--t3)",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "9px",
            letterSpacing: "0.2em",
          }}
        >
          SCROLL
        </span>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
          }}
        >
          <ArrowDown size={14} style={{ color: "var(--neon)" }} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;