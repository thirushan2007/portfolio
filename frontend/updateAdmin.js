const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'pages', 'AdminDashboard.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Import Experience and experienceService
content = content.replace(
  /import \{ Project, Certificate, ContactMessage, Skill \} from '\.\.\/types';/,
  "import { Project, Certificate, ContactMessage, Skill, Experience } from '../types';"
);

content = content.replace(
  /import \{ projectService, certificateService, contactService, skillService \} from '\.\.\/services\/portfolioService';/,
  "import { projectService, certificateService, contactService, skillService, experienceService } from '../services/portfolioService';"
);

// 2. Add State for Experiences
content = content.replace(
  /const \[projects, setProjects\] = useState<Project\[\]>\(\[\]\);/,
  `const [projects, setProjects] = useState<Project[]>([]);
  const [exps, setExps] = useState<Experience[]>([]);
  const [showEF, setShowEF] = useState(false);
  const [editE, setEditE] = useState<Experience | null>(null);
  const [ef, setEf] = useState<Partial<Experience>>({});
  const [ei, setEi] = useState(''); // tech string input
  const [edi, setEdi] = useState(''); // description string input`
);

// 3. Fetch Experiences on load
content = content.replace(
  /skillService\.getAll\(\)\.then\(r => setSkills\(r\.data\)\);/,
  `skillService.getAll().then(r => setSkills(r.data));
    experienceService.getAll().then(r => setExps(r.data));`
);

// 4. CRUD logic for Experiences
const crudLogic = `
  const saveE = async () => {
    try {
      if (editE?.id) {
        const res = await experienceService.update(editE.id, ef);
        setExps(exps.map(e => e.id === editE.id ? res.data : e));
      } else {
        const res = await experienceService.create(ef);
        setExps([...exps, res.data]);
      }
      setShowEF(false);
    } catch (e) { console.error(e); }
  };
  const delE = async (id: string) => {
    try { await experienceService.delete(id); setExps(exps.filter(e => e.id !== id)); } catch(e) { console.error(e); }
  };
  const addETech = () => { if(ei.trim()){ setEf(f => ({...f, technologies: [...(f.technologies||[]), ei.trim()]})); setEi(''); } };
  const addEDesc = () => { if(edi.trim()){ setEf(f => ({...f, description: [...(f.description||[]), edi.trim()]})); setEdi(''); } };

  const saveP =`;
content = content.replace(/const saveP =/, crudLogic);

// 5. Add Sidebar Tab
const sidebarTab = `
          <button onClick={() => setTab('skills')} className={\`btn \${tab==='skills'?'btn-solid':'btn-ghost'}\`} style={{width: '100%', justifyContent: 'flex-start'}}><Code size={16}/> Skills</button>
          <button onClick={() => setTab('experience')} className={\`btn \${tab==='experience'?'btn-solid':'btn-ghost'}\`} style={{width: '100%', justifyContent: 'flex-start'}}><Briefcase size={16}/> Experience</button>`;
content = content.replace(
  /<button onClick=\{\(\) => setTab\('skills'\)\} className=\{`btn \$\{tab==='skills'\?'btn-solid':'btn-ghost'\}`\} style=\{\{width: '100%', justifyContent: 'flex-start'\}\}><Code size=\{16\}\/> Skills<\/button>/,
  sidebarTab
);

// Add Briefcase to lucide imports
content = content.replace(/LayoutDashboard, Plus, Trash2, Edit2, LogOut, Code, Mail, X, ExternalLink/, "LayoutDashboard, Plus, Trash2, Edit2, LogOut, Code, Mail, X, ExternalLink, Briefcase");

// 6. Add Experience UI Tab Panel
const expUi = `
{tab === 'experience' && <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <p style={{fontSize: 13, color: 'var(--t2)'}}>{exps.length} experiences</p>
    <button className="btn btn-solid" style={{padding: '8px 16px', fontSize: 12}} onClick={() => {setShowEF(true); setEditE(null); setEf({technologies: [], description: []});}}>
      <Plus size={14}/> Add Experience
    </button>
  </div>
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14}}>
    {exps.map((e: any) => (
      <div key={e.id} className="glass" style={{padding: 20}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
          <span style={{fontFamily: 'var(--din)', fontWeight: 600, fontSize: 16, color: 'var(--t1)'}}>{e.company}</span>
          <div style={{display: 'flex', gap: 4}}>
            <button onClick={() => {setEditE(e); setEf(e); setShowEF(true);}} style={{background: 'none', border: 'none', color: 'var(--t2)', padding: 4}}><Edit2 size={13}/></button>
            <button onClick={() => delE(e.id)} style={{background: 'none', border: 'none', color: '#f87171', padding: 4}}><Trash2 size={13}/></button>
          </div>
        </div>
        <p style={{fontSize: 13, color: 'var(--neon)', marginBottom: 4}}>{e.role}</p>
        <p style={{fontSize: 12, color: 'var(--t3)', marginBottom: 12}}>{e.duration} | {e.location}</p>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
          {(e.technologies||[]).map((t: string, i: number) => <span key={i} className="tag" style={{fontSize: 10, padding: '2px 6px'}}>{t}</span>)}
        </div>
      </div>
    ))}
  </div>
  <AnimatePresence>
    {showEF && <motion.div className="modal-overlay">
      <motion.div className="glass" style={{maxWidth: 500, width: '100%', padding: 28, maxHeight: '90vh', overflowY: 'auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
          <h2 style={{fontFamily: 'var(--din)', fontWeight: 700, fontSize: '1.2rem'}}>{editE ? 'Edit' : 'Add'} Experience</h2>
          <button onClick={() => setShowEF(false)} style={{background: 'none', border: 'none', color: 'var(--t2)'}}><X size={18}/></button>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <input className={inp} placeholder="Company*" value={ef.company || ''} onChange={e => setEf(f => ({...f, company: e.target.value}))} />
          <input className={inp} placeholder="Role*" value={ef.role || ''} onChange={e => setEf(f => ({...f, role: e.target.value}))} />
          <input className={inp} placeholder="Duration (e.g. Jan 2023 - Present)" value={ef.duration || ''} onChange={e => setEf(f => ({...f, duration: e.target.value}))} />
          <input className={inp} placeholder="Location" value={ef.location || ''} onChange={e => setEf(f => ({...f, location: e.target.value}))} />
          
          <label style={{fontSize: 12, color: 'var(--t2)', marginTop: 8}}>Responsibilities</label>
          <div style={{display: 'flex', gap: 8}}>
            <input className={inp} style={{flex: 1}} placeholder="Add point" value={edi} onChange={e => setEdi(e.target.value)} onKeyDown={e => e.key === 'Enter' && addEDesc()} />
            <button onClick={addEDesc} className="btn btn-outline" style={{padding: '8px 14px', fontSize: 12}}>Add</button>
          </div>
          <ul style={{fontSize: 12, paddingLeft: 16}}>
            {(ef.description||[]).map((d: string, i: number) => <li key={i}>{d} <button onClick={() => setEf(f => ({...f, description: f.description?.filter((_,ii) => ii !== i)}))} style={{background:'none', border:'none', color:'red'}}>x</button></li>)}
          </ul>

          <label style={{fontSize: 12, color: 'var(--t2)', marginTop: 8}}>Technologies</label>
          <div style={{display: 'flex', gap: 8}}>
            <input className={inp} style={{flex: 1}} placeholder="Add tech" value={ei} onChange={e => setEi(e.target.value)} onKeyDown={e => e.key === 'Enter' && addETech()} />
            <button onClick={addETech} className="btn btn-outline" style={{padding: '8px 14px', fontSize: 12}}>Add</button>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
            {(ef.technologies||[]).map((t: string, i: number) => <span key={i} className="tag">{t} <button onClick={() => setEf(f => ({...f, technologies: f.technologies?.filter((_,ii) => ii !== i)}))} style={{background:'none', border:'none', color:'red'}}>x</button></span>)}
          </div>

          <button onClick={saveE} className="btn btn-solid" style={{width: '100%', justifyContent: 'center', marginTop: 12}}>{editE ? 'Update' : 'Create'} Experience</button>
        </div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>
</div>}
{tab === 'certificates'`;
content = content.replace(/{tab === 'certificates'/g, expUi);

// Crimson Aesthetic Updates
content = content.replace(/rgba\(0,212,255,0\.15\)/g, "rgba(178,34,34,0.15)");
content = content.replace(/borderBottom: '2px solid var\(--neon\)'/g, "borderBottom: '2px solid var(--crimson)'");

fs.writeFileSync(file, content, 'utf8');
console.log("Admin Dashboard Updated!");
