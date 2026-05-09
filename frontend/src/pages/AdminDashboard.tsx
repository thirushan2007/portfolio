import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  FolderOpen,
  Award,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  X,
  Menu,
  TrendingUp,
  Mail,
  Code2,
  Cpu,
  Briefcase,
  FileText,
  ExternalLink,
} from "lucide-react";

import {
  projectService,
  certificateService,
  contactService,
  skillService,
  experienceService,
  resumeService,
} from "../services/portfolioService";
import {
  Project,
  Certificate,
  ContactMessage,
  Skill,
  Experience,
} from "../types";
import toast from "react-hot-toast";
type Tab =
  | "overview"
  | "projects"
  | "certificates"
  | "messages"
  | "skills"
  | "experience"
  | "resume";
const StatCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}> = ({ icon: Icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass"
    style={{ padding: 24, display: "flex", alignItems: "center", gap: 16 }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: color + "20",
        border: `1px solid ${color}40`,
      }}
    >
      <Icon size={22} style={{ color }} />
    </div>
    <div>
      <p
        style={{
          fontFamily: "var(--din)",
          fontSize: "2rem",
          fontWeight: 800,
          color: "var(--t1)",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p style={{ fontSize: 12, color: "var(--t2)", marginTop: 4 }}>{label}</p>
    </div>
  </motion.div>
);
const inp = "w-full px-4 py-2.5 input text-sm";
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebar, setSidebar] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [msgs, setMsgs] = useState<ContactMessage[]>([]);
  const [exps, setExps] = useState<Experience[]>([]);
  const [showEF, setShowEF] = useState(false);
  const [editE, setEditE] = useState<Experience | null>(null);
  const [ef, setEf] = useState<Partial<Experience>>({
    company: "",
    role: "",
    duration: "",
    location: "",
    description: [],
    technologies: [],
  });
  const [ei, setEi] = useState("");
  const [edi, setEdi] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showPF, setShowPF] = useState(false);
  const [showCF, setShowCF] = useState(false);
  const [showSF, setShowSF] = useState(false);
  const [editP, setEditP] = useState<Project | null>(null);
  const [editS, setEditS] = useState<Skill | null>(null);
  const [pf, setPf] = useState<Partial<Project>>({
    title: "",
    description: "",
    techStack: [],
    category: "",
    githubLink: "",
    demoLink: "",
  });
  const [cf, setCf] = useState<Partial<Certificate>>({
    title: "",
    issuer: "",
    date: "",
    credentialUrl: "",
    description: "",
  });
  const [sf, setSf] = useState<Partial<Skill>>({
    name: "",
    icon: "",
    category: "",
    color: "#00d4ff",
    bg: "#061822",
  });
  const [ti, setTi] = useState("");
  useEffect(() => {
    const f = async () => {
      try {
        const [p, c, m, s, e] = await Promise.allSettled([
          projectService.getAll(),
          certificateService.getAll(),
          contactService.getAll(),
          skillService.getAll(),
          experienceService.getAll(),
        ]);
        if (p.status === "fulfilled") setProjects(p.value.data);
        if (c.status === "fulfilled") setCerts(c.value.data);
        if (m.status === "fulfilled") setMsgs(m.value.data);
        if (s.status === "fulfilled") setSkills(s.value.data);
        if (e.status === "fulfilled") setExps(e.value.data);
      } catch {}
    };
    f();
  }, []);
  const addT = () => {
    if (ti.trim()) {
      setPf((f) => ({ ...f, techStack: [...(f.techStack || []), ti.trim()] }));
      setTi("");
    }
  };

  const saveE = async () => {
    try {
      if (editE?.id) {
        const res = await experienceService.update(editE.id, ef);
        setExps(exps.map((e) => (e.id === editE.id ? res.data : e)));
      } else {
        const res = await experienceService.create(ef);
        setExps([...exps, res.data]);
      }
      setShowEF(false);
      toast.success("Experience saved!");
    } catch (e) {
      toast.error("Failed");
      console.error(e);
    }
  };
  const delE = async (id: string) => {
    try {
      await experienceService.delete(id);
      setExps(exps.filter((e) => e.id !== id));
      toast.success("Deleted!");
    } catch (e) {
      toast.error("Failed");
    }
  };
  const addETech = () => {
    if (ei.trim()) {
      setEf((f) => ({
        ...f,
        technologies: [...(f.technologies || []), ei.trim()],
      }));
      setEi("");
    }
  };
  const addEDesc = () => {
    if (edi.trim()) {
      setEf((f) => ({
        ...f,
        description: [...(f.description || []), edi.trim()],
      }));
      setEdi("");
    }
  };

  const saveP = async () => {
    try {
      if (editP) {
        const r = await projectService.update(editP.id, pf);
        setProjects((p) => p.map((x) => (x.id === editP.id ? r.data : x)));
        toast.success("Updated!");
      } else {
        const r = await projectService.create(pf);
        setProjects((p) => [...p, r.data]);
        toast.success("Added!");
      }
      setShowPF(false);
      setEditP(null);
      setPf({
        title: "",
        description: "",
        techStack: [],
        category: "",
        githubLink: "",
        demoLink: "",
      });
    } catch {
      toast.error("Failed");
    }
  };
  const delP = async (id: string) => {
    try {
      await projectService.delete(id);
      setProjects((p) => p.filter((x) => x.id !== id));
      toast.success("Deleted!");
    } catch {
      toast.error("Failed");
    }
  };
  const saveC = async () => {
    try {
      const r = await certificateService.create(cf);
      setCerts((p) => [...p, r.data]);
      toast.success("Added!");
      setShowCF(false);
      setCf({
        title: "",
        issuer: "",
        date: "",
        credentialUrl: "",
        description: "",
      });
    } catch {
      toast.error("Failed");
    }
  };
  const delC = async (id: string) => {
    try {
      await certificateService.delete(id);
      setCerts((p) => p.filter((x) => x.id !== id));
      toast.success("Deleted!");
    } catch {
      toast.error("Failed");
    }
  };
  const saveS = async () => {
    try {
      if (editS?.id) {
        const r = await skillService.update(editS.id, sf);
        setSkills((p) => p.map((x) => (x.id === editS.id ? r.data : x)));
        toast.success("Updated!");
      } else {
        const r = await skillService.create(sf);
        setSkills((p) => [...p, r.data]);
        toast.success("Added!");
      }
      setShowSF(false);
      setEditS(null);
      setSf({
        name: "",
        icon: "",
        category: "",
        color: "#00d4ff",
        bg: "#061822",
      });
    } catch {
      toast.error("Failed");
    }
  };
  const delS = async (id: string) => {
    try {
      await skillService.delete(id);
      setSkills((p) => p.filter((x) => x.id !== id));
      toast.success("Deleted!");
    } catch {
      toast.error("Failed");
    }
  };
  const navItems = [
    { id: "overview", icon: LayoutDashboard, label: "Overview" },
    { id: "projects", icon: FolderOpen, label: "Projects" },
    { id: "certificates", icon: Award, label: "Certificates" },
    { id: "skills", icon: Cpu, label: "Skills" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "resume", icon: FileText, label: "Resume" },
    { id: "messages", icon: MessageSquare, label: "Messages" },
  ] as const;
  return (
    <div
      style={{ minHeight: "100vh", background: "var(--bg)", display: "flex" }}
    >
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          position: "fixed",
          top: 0,
          bottom: 0,
          left: sidebar ? 0 : -240,
          zIndex: 50,
          background: "rgba(5,5,8,0.97)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          transition: "left .3s",
          backdropFilter: "blur(20px)",
        }}
        className="lg:static lg:left-0"
      >
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "linear-gradient(135deg,var(--neon),var(--violet))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Code2 size={16} style={{ color: "#050508" }} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--din)",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--t1)",
                }}
              >
                Admin
              </p>
              <p style={{ fontSize: 11, color: "var(--t3)" }}>Admin</p>
            </div>
          </div>
        </div>
        <nav
          style={{
            flex: 1,
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setTab(id as Tab);
                setSidebar(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                background: tab === id ? "rgba(0,212,255,0.1)" : "transparent",
                color: tab === id ? "var(--neon)" : "var(--t2)",
                fontFamily: "var(--font)",
                fontSize: 13,
                fontWeight: 500,
                textAlign: "left",
                transition: "all .2s",
                borderLeft:
                  tab === id
                    ? "2px solid var(--neon)"
                    : "2px solid transparent",
              }}
            >
              <Icon size={16} />
              {label}
              {id === "messages" && msgs.length > 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: "var(--neon)",
                    color: "#050508",
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 999,
                    width: 18,
                    height: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {msgs.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div
          style={{ padding: "12px 10px", borderTop: "1px solid var(--border)" }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(212,255,0,0.15)",
              background: "transparent",
              color: "var(--neon)",
              fontFamily: "var(--font)",
              fontSize: 13,
              width: "100%",
              transition: "all .2s",
              marginBottom: "8px",
            }}
          >
            <ExternalLink size={16} />
            View Portfolio
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,100,100,0.15)",
              background: "transparent",
              color: "#f87171",
              fontFamily: "var(--font)",
              fontSize: 13,
              width: "100%",
              transition: "all .2s",
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
      {sidebar && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(5,5,8,0.7)",
          }}
          onClick={() => setSidebar(false)}
        />
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            background: "rgba(5,5,8,0.9)",
            borderBottom: "1px solid var(--border)",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(20px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setSidebar(!sidebar)}
              style={{
                background: "none",
                border: "none",
                color: "var(--t2)",
                display: "flex",
              }}
              className="lg:hidden"
            >
              <Menu size={20} />
            </button>
            <h1
              style={{
                fontFamily: "var(--din)",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: "var(--t1)",
                textTransform: "capitalize",
              }}
            >
              {tab}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 6px #4ade80",
              }}
            />
            <span style={{ fontSize: 12, color: "var(--t3)" }}>
              System Online
            </span>
          </div>
        </header>
        <main style={{ flex: 1, padding: 24 }}>
          {tab === "overview" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: 16,
              }}
            >
              <StatCard
                icon={FolderOpen}
                label="Projects"
                value={projects.length}
                color="#00d4ff"
              />
              <StatCard
                icon={Award}
                label="Certificates"
                value={certs.length}
                color="#a78bfa"
              />
              <StatCard
                icon={Cpu}
                label="Skills"
                value={skills.length}
                color="#6DB33F"
              />
              <StatCard
                icon={MessageSquare}
                label="Messages"
                value={msgs.length}
                color="#f472b6"
              />
              <StatCard
                icon={TrendingUp}
                label="Experience"
                value={1}
                color="#ED8B00"
              />
            </div>
          )}
          {tab === "projects" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 13, color: "var(--t2)" }}>
                  {projects.length} projects
                </p>
                <button
                  className="btn btn-solid"
                  style={{ padding: "8px 16px", fontSize: 12 }}
                  onClick={() => {
                    setShowPF(true);
                    setEditP(null);
                    setPf({
                      title: "",
                      description: "",
                      techStack: [],
                      category: "",
                      githubLink: "",
                      demoLink: "",
                    });
                  }}
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                  gap: 14,
                }}
              >
                {projects.map((p) => (
                  <div key={p.id} className="glass" style={{ padding: 20 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--din)",
                          fontWeight: 600,
                          fontSize: 15,
                          color: "var(--t1)",
                        }}
                      >
                        {p.title}
                      </span>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => {
                            setEditP(p);
                            setPf(p);
                            setShowPF(true);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--t2)",
                            padding: 4,
                            borderRadius: 6,
                          }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => delP(p.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#f87171",
                            padding: 4,
                            borderRadius: 6,
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--t2)",
                        marginBottom: 8,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.description}
                    </p>
                    <span className="tag">{p.category}</span>
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {showPF && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-overlay"
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      className="glass"
                      style={{
                        maxWidth: 480,
                        width: "100%",
                        padding: 28,
                        maxHeight: "90vh",
                        overflowY: "auto",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 20,
                        }}
                      >
                        <h2
                          style={{
                            fontFamily: "var(--din)",
                            fontWeight: 700,
                            fontSize: "1.2rem",
                            color: "var(--t1)",
                          }}
                        >
                          {editP ? "Edit" : "Add"} Project
                        </h2>
                        <button
                          onClick={() => setShowPF(false)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--t2)",
                          }}
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <input
                          className={inp}
                          placeholder="Title*"
                          value={pf.title || ""}
                          onChange={(e) =>
                            setPf((f) => ({ ...f, title: e.target.value }))
                          }
                        />
                        <textarea
                          className={inp}
                          placeholder="Description*"
                          rows={3}
                          value={pf.description || ""}
                          onChange={(e) =>
                            setPf((f) => ({
                              ...f,
                              description: e.target.value,
                            }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Category"
                          value={pf.category || ""}
                          onChange={(e) =>
                            setPf((f) => ({ ...f, category: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="GitHub URL"
                          value={pf.githubLink || ""}
                          onChange={(e) =>
                            setPf((f) => ({ ...f, githubLink: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Demo URL"
                          value={pf.demoLink || ""}
                          onChange={(e) =>
                            setPf((f) => ({ ...f, demoLink: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Image URL"
                          value={pf.imageUrl || ""}
                          onChange={(e) =>
                            setPf((f) => ({ ...f, imageUrl: e.target.value }))
                          }
                        />
                        <div style={{ display: "flex", gap: 8 }}>
                          <input
                            className={inp}
                            style={{ flex: 1 }}
                            placeholder="Add tech"
                            value={ti}
                            onChange={(e) => setTi(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addT()}
                          />
                          <button
                            onClick={addT}
                            className="btn btn-outline"
                            style={{ padding: "8px 14px", fontSize: 12 }}
                          >
                            Add
                          </button>
                        </div>
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                        >
                          {(pf.techStack || []).map((t, i) => (
                            <span
                              key={i}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                padding: "2px 8px",
                                borderRadius: 999,
                                background: "rgba(167,139,250,0.1)",
                                border: "1px solid rgba(167,139,250,0.2)",
                                fontSize: 11,
                                color: "var(--violet)",
                              }}
                            >
                              {t}
                              <button
                                onClick={() =>
                                  setPf((f) => ({
                                    ...f,
                                    techStack: f.techStack?.filter(
                                      (_, ii) => ii !== i,
                                    ),
                                  }))
                                }
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "inherit",
                                  lineHeight: 1,
                                  padding: 0,
                                }}
                              >
                                <X size={9} />
                              </button>
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={saveP}
                          className="btn btn-solid"
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            marginTop: 4,
                          }}
                        >
                          {editP ? "Update" : "Create"} Project
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {tab === "certificates" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 13, color: "var(--t2)" }}>
                  {certs.length} certificates
                </p>
                <button
                  className="btn btn-solid"
                  style={{ padding: "8px 16px", fontSize: 12 }}
                  onClick={() => setShowCF(true)}
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                  gap: 14,
                }}
              >
                {certs.map((c) => (
                  <div key={c.id} className="glass" style={{ padding: 20 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--din)",
                          fontWeight: 600,
                          fontSize: 15,
                          color: "var(--t1)",
                        }}
                      >
                        {c.title}
                      </span>
                      <button
                        onClick={() => delC(c.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#f87171",
                          padding: 4,
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--neon)",
                        marginBottom: 4,
                      }}
                    >
                      {c.issuer}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--t3)" }}>{c.date}</p>
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {showCF && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-overlay"
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      className="glass"
                      style={{ maxWidth: 440, width: "100%", padding: 28 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 20,
                        }}
                      >
                        <h2
                          style={{
                            fontFamily: "var(--din)",
                            fontWeight: 700,
                            fontSize: "1.2rem",
                            color: "var(--t1)",
                          }}
                        >
                          Add Certificate
                        </h2>
                        <button
                          onClick={() => setShowCF(false)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--t2)",
                          }}
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <input
                          className={inp}
                          placeholder="Title*"
                          value={cf.title || ""}
                          onChange={(e) =>
                            setCf((f) => ({ ...f, title: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Issuer*"
                          value={cf.issuer || ""}
                          onChange={(e) =>
                            setCf((f) => ({ ...f, issuer: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Date"
                          value={cf.date || ""}
                          onChange={(e) =>
                            setCf((f) => ({ ...f, date: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Credential URL"
                          value={cf.credentialUrl || ""}
                          onChange={(e) =>
                            setCf((f) => ({
                              ...f,
                              credentialUrl: e.target.value,
                            }))
                          }
                        />
                        <textarea
                          className={inp}
                          placeholder="Description"
                          rows={2}
                          value={cf.description || ""}
                          onChange={(e) =>
                            setCf((f) => ({
                              ...f,
                              description: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={saveC}
                          className="btn btn-solid"
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          Add Certificate
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {tab === "experience" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 13, color: "var(--t2)" }}>
                  {exps.length} experiences
                </p>
                <button
                  className="btn btn-solid"
                  style={{ padding: "8px 16px", fontSize: 12 }}
                  onClick={() => {
                    setShowEF(true);
                    setEditE(null);
                    setEf({ technologies: [], description: [] });
                  }}
                >
                  <Plus size={14} />
                  Add Experience
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                  gap: 14,
                }}
              >
                {exps.map((e: any) => (
                  <div key={e.id} className="glass" style={{ padding: 20 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--din)",
                          fontWeight: 600,
                          fontSize: 16,
                          color: "var(--t1)",
                        }}
                      >
                        {e.company}
                      </span>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          onClick={() => {
                            setEditE(e);
                            setEf(e);
                            setShowEF(true);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--t2)",
                            padding: 4,
                          }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => delE(e.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#f87171",
                            padding: 4,
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--neon)",
                        marginBottom: 4,
                      }}
                    >
                      {e.role}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--t3)",
                        marginBottom: 12,
                      }}
                    >
                      {e.duration} | {e.location}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(e.technologies || []).map((t: string, i: number) => (
                        <span
                          key={i}
                          className="tag"
                          style={{ fontSize: 10, padding: "2px 6px" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {showEF && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-overlay"
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      className="glass"
                      style={{
                        maxWidth: 500,
                        width: "100%",
                        padding: 28,
                        maxHeight: "90vh",
                        overflowY: "auto",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 20,
                        }}
                      >
                        <h2
                          style={{
                            fontFamily: "var(--din)",
                            fontWeight: 700,
                            fontSize: "1.2rem",
                          }}
                        >
                          {editE ? "Edit" : "Add"} Experience
                        </h2>
                        <button
                          onClick={() => setShowEF(false)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--t2)",
                          }}
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <input
                          className={inp}
                          placeholder="Company*"
                          value={ef.company || ""}
                          onChange={(e) =>
                            setEf((f) => ({ ...f, company: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Role*"
                          value={ef.role || ""}
                          onChange={(e) =>
                            setEf((f) => ({ ...f, role: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Duration (e.g. Jan 2023 - Present)"
                          value={ef.duration || ""}
                          onChange={(e) =>
                            setEf((f) => ({ ...f, duration: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Location"
                          value={ef.location || ""}
                          onChange={(e) =>
                            setEf((f) => ({ ...f, location: e.target.value }))
                          }
                        />

                        <label
                          style={{
                            fontSize: 12,
                            color: "var(--t2)",
                            marginTop: 8,
                          }}
                        >
                          Responsibilities
                        </label>
                        <div style={{ display: "flex", gap: 8 }}>
                          <input
                            className={inp}
                            style={{ flex: 1 }}
                            placeholder="Add point"
                            value={edi}
                            onChange={(e) => setEdi(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addEDesc()}
                          />
                          <button
                            onClick={addEDesc}
                            className="btn btn-outline"
                            style={{ padding: "8px 14px", fontSize: 12 }}
                          >
                            Add
                          </button>
                        </div>
                        <ul style={{ fontSize: 12, paddingLeft: 16 }}>
                          {(ef.description || []).map(
                            (d: string, i: number) => (
                              <li key={i}>
                                {d}{" "}
                                <button
                                  onClick={() =>
                                    setEf((f) => ({
                                      ...f,
                                      description: f.description?.filter(
                                        (_, ii) => ii !== i,
                                      ),
                                    }))
                                  }
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "red",
                                  }}
                                >
                                  x
                                </button>
                              </li>
                            ),
                          )}
                        </ul>

                        <label
                          style={{
                            fontSize: 12,
                            color: "var(--t2)",
                            marginTop: 8,
                          }}
                        >
                          Technologies
                        </label>
                        <div style={{ display: "flex", gap: 8 }}>
                          <input
                            className={inp}
                            style={{ flex: 1 }}
                            placeholder="Add tech"
                            value={ei}
                            onChange={(e) => setEi(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addETech()}
                          />
                          <button
                            onClick={addETech}
                            className="btn btn-outline"
                            style={{ padding: "8px 14px", fontSize: 12 }}
                          >
                            Add
                          </button>
                        </div>
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                        >
                          {(ef.technologies || []).map(
                            (t: string, i: number) => (
                              <span key={i} className="tag">
                                {t}{" "}
                                <button
                                  onClick={() =>
                                    setEf((f) => ({
                                      ...f,
                                      technologies: f.technologies?.filter(
                                        (_, ii) => ii !== i,
                                      ),
                                    }))
                                  }
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "red",
                                  }}
                                >
                                  x
                                </button>
                              </span>
                            ),
                          )}
                        </div>

                        <button
                          onClick={saveE}
                          className="btn btn-solid"
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            marginTop: 12,
                          }}
                        >
                          {editE ? "Update" : "Create"} Experience
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {tab === "skills" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 13, color: "var(--t2)" }}>
                  {skills.length} skills � changes reflect live on site
                </p>
                <button
                  className="btn btn-solid"
                  style={{ padding: "8px 16px", fontSize: 12 }}
                  onClick={() => {
                    setShowSF(true);
                    setEditS(null);
                    setSf({
                      name: "",
                      icon: "",
                      category: "",
                      color: "#00d4ff",
                      bg: "#061822",
                    });
                  }}
                >
                  <Plus size={14} />
                  Add Skill
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
                  gap: 12,
                }}
              >
                {skills.map((s) => (
                  <div
                    key={s.id}
                    className="glass"
                    style={{
                      padding: 16,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 22 }}>{s.icon}</span>
                        <span
                          style={{
                            fontFamily: "var(--din)",
                            fontWeight: 600,
                            fontSize: 14,
                            color: "var(--t1)",
                          }}
                        >
                          {s.name}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          onClick={() => {
                            setEditS(s);
                            setSf(s);
                            setShowSF(true);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--t2)",
                            padding: 3,
                          }}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => s.id && delS(s.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#f87171",
                            padding: 3,
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <span className="tag" style={{ fontSize: 9 }}>
                      {s.category}
                    </span>
                    <div
                      style={{
                        height: 2,
                        borderRadius: 1,
                        background: s.color || "var(--neon)",
                        opacity: 0.4,
                      }}
                    />
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {showSF && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-overlay"
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      className="glass"
                      style={{ maxWidth: 420, width: "100%", padding: 28 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 20,
                        }}
                      >
                        <h2
                          style={{
                            fontFamily: "var(--din)",
                            fontWeight: 700,
                            fontSize: "1.2rem",
                            color: "var(--t1)",
                          }}
                        >
                          {editS ? "Edit" : "Add"} Skill
                        </h2>
                        <button
                          onClick={() => setShowSF(false)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--t2)",
                          }}
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <input
                          className={inp}
                          placeholder="Name (e.g. React)"
                          value={sf.name || ""}
                          onChange={(e) =>
                            setSf((f) => ({ ...f, name: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Icon emoji (e.g. ??)"
                          value={sf.icon || ""}
                          onChange={(e) =>
                            setSf((f) => ({ ...f, icon: e.target.value }))
                          }
                        />
                        <input
                          className={inp}
                          placeholder="Category (Frontend/Backend/...)"
                          value={sf.category || ""}
                          onChange={(e) =>
                            setSf((f) => ({ ...f, category: e.target.value }))
                          }
                        />
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 8,
                          }}
                        >
                          <div>
                            <label
                              style={{
                                fontSize: 11,
                                color: "var(--t2)",
                                display: "block",
                                marginBottom: 4,
                              }}
                            >
                              Ball color
                            </label>
                            <input
                              type="color"
                              value={sf.color || "#00d4ff"}
                              onChange={(e) =>
                                setSf((f) => ({ ...f, color: e.target.value }))
                              }
                              style={{
                                width: "100%",
                                height: 38,
                                borderRadius: 8,
                                border: "1px solid var(--border)",
                                background: "none",
                                padding: 2,
                              }}
                            />
                          </div>
                          <div>
                            <label
                              style={{
                                fontSize: 11,
                                color: "var(--t2)",
                                display: "block",
                                marginBottom: 4,
                              }}
                            >
                              Ball background
                            </label>
                            <input
                              type="color"
                              value={sf.bg || "#061822"}
                              onChange={(e) =>
                                setSf((f) => ({ ...f, bg: e.target.value }))
                              }
                              style={{
                                width: "100%",
                                height: 38,
                                borderRadius: 8,
                                border: "1px solid var(--border)",
                                background: "none",
                                padding: 2,
                              }}
                            />
                          </div>
                        </div>
                        <button
                          onClick={saveS}
                          className="btn btn-solid"
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            marginTop: 4,
                          }}
                        >
                          {editS ? "Update" : "Add"} Skill
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
                    {tab === "resume" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 13, color: "var(--t2)" }}>
                  Manage your dynamic Resume
                </p>
              </div>
              <div className="glass" style={{ padding: 32, maxWidth: 600 }}>
                <h3 style={{ fontFamily: "var(--din)", fontSize: "1.2rem", marginBottom: 16 }}>Upload New Resume (PDF)</h3>
                <input 
                  type="file" 
                  accept="application/pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                      const base64Data = reader.result as string;
                      try {
                        const toastId = toast.loading("Uploading resume to MongoDB...");
                        await resumeService.upload({
                          fileName: file.name,
                          contentType: file.type,
                          base64Data: base64Data
                        });
                        toast.success("Resume uploaded successfully!", { id: toastId });
                      } catch (err) {
                        toast.error("Failed to upload resume.");
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                  style={{
                    width: "100%",
                    padding: 12,
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--t1)",
                    cursor: "pointer"
                  }}
                />
                <p style={{ fontSize: 12, color: "var(--t3)", marginTop: 12 }}>
                  Your resume will be stored securely in the database and automatically linked to the "Download Resume" button on your homepage.
                </p>
              </div>
            </div>
          )}
          {tab === "messages" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: 13, color: "var(--t2)" }}>
                {msgs.length} messages
              </p>
              {msgs.length === 0 && (
                <div
                  className="glass"
                  style={{ padding: 48, textAlign: "center" }}
                >
                  <Mail
                    size={36}
                    style={{ color: "var(--t3)", margin: "0 auto 12px" }}
                  />
                  <p style={{ color: "var(--t3)" }}>No messages yet</p>
                </div>
              )}
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass"
                  style={{ padding: 20 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--din)",
                          fontWeight: 600,
                          fontSize: 15,
                          color: "var(--t1)",
                        }}
                      >
                        {m.name}
                      </p>
                      <p style={{ fontSize: 11, color: "var(--neon)" }}>
                        {m.email}
                      </p>
                    </div>
                    <span style={{ fontSize: 11, color: "var(--t3)" }}>
                      {m.createdAt?.slice(0, 10)}
                    </span>
                  </div>
                  {m.subject && (
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--t1)",
                        marginBottom: 6,
                      }}
                    >
                      {m.subject}
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--t2)",
                      lineHeight: 1.7,
                    }}
                  >
                    {m.message}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;
