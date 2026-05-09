const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'pages', 'AdminDashboard.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Import Experience
content = content.replace(
  /import\{Project,Certificate,ContactMessage,Skill\}from"\.\.\/types";/g,
  'import{Project,Certificate,ContactMessage,Skill,Experience}from"../types";'
);

// 2. Import experienceService
content = content.replace(
  /import\{projectService,certificateService,contactService,skillService\}from"\.\.\/services\/portfolioService";/g,
  'import{projectService,certificateService,contactService,skillService,experienceService}from"../services/portfolioService";'
);

// 3. Add Tab to union type
content = content.replace(
  /type Tab="overview"\|"projects"\|"certificates"\|"messages"\|"skills";/g,
  'type Tab="overview"|"projects"|"certificates"|"messages"|"skills"|"experience";'
);

// 4. Update the lucide-react imports to add Briefcase
content = content.replace(
  /LogOut,Plus,Trash2,Edit2,X,Menu,TrendingUp,Mail,Code2,Cpu\}from"lucide-react";/g,
  'LogOut,Plus,Trash2,Edit2,X,Menu,TrendingUp,Mail,Code2,Cpu,Briefcase}from"lucide-react";'
);

// 5. Add State variables for Experience
const stateInsert = `const [msgs,setMsgs]=useState<ContactMessage[]>([]);
const [exps,setExps]=useState<Experience[]>([]);
const [showEF,setShowEF]=useState(false);
const [editE,setEditE]=useState<Experience | null>(null);
const [ef,setEf]=useState<Partial<Experience>>({});
const [ei,setEi]=useState("");
const [edi,setEdi]=useState("");`;
content = content.replace(
  /const \[msgs,setMsgs\]=useState<ContactMessage\[\]>\(\[\]\);/g,
  stateInsert
);

// 6. Fetch Experiences on load
content = content.replace(
  /skillService\.getAll\(\)\.then\(r=>setSkills\(r\.data\)\);/g,
  `skillService.getAll().then(r=>setSkills(r.data));
experienceService.getAll().then(r=>setExps(r.data));`
);

// 7. Add CRUD logic for Experience
const crudInsert = `const saveP=async()=>{`;
const crudReplace = `
const saveE=async()=>{
  try{
    if(editE?.id){
      const res=await experienceService.update(editE.id,ef);
      setExps(exps.map(e=>e.id===editE.id?res.data:e));
    }else{
      const res=await experienceService.create(ef);
      setExps([...exps,res.data]);
    }
    setShowEF(false);
    toast.success("Experience saved!");
  }catch(e){toast.error("Failed");console.error(e);}
};
const delE=async(id:string)=>{
  try{await experienceService.delete(id);setExps(exps.filter(e=>e.id!==id));toast.success("Deleted!");}
  catch(e){toast.error("Failed");}
};
const addETech=()=>{if(ei.trim()){setEf(f=>({...f,technologies:[...(f.technologies||[]),ei.trim()]}));setEi("");}};
const addEDesc=()=>{if(edi.trim()){setEf(f=>({...f,description:[...(f.description||[]),edi.trim()]}));setEdi("");}};

const saveP=async()=>{`;
content = content.replace(crudInsert, crudReplace);

// 8. Add Sidebar Button
const sidebarButton = `<button onClick={()=>setTab("skills")}className={\`btn \${tab==="skills"?"btn-solid":"btn-ghost"}\`}style={{width:"100%",justifyContent:"flex-start"}}><Code2 size={16}/>Skills</button>
<button onClick={()=>setTab("experience")}className={\`btn \${tab==="experience"?"btn-solid":"btn-ghost"}\`}style={{width:"100%",justifyContent:"flex-start"}}><Briefcase size={16}/>Experience</button>`;
content = content.replace(
  /<button onClick=\{\(\)=>setTab\("skills"\)\}className=\{`btn \$\{tab==="skills"\?"btn-solid":"btn-ghost"\}`\}style=\{\{width:"100%",justifyContent:"flex-start"\}\}><Code2 size=\{16\}\/>Skills<\/button>/g,
  sidebarButton
);

// 9. Add Experience UI panel
const expPanel = `
{tab==="experience"&&<div style={{display:"flex",flexDirection:"column",gap:20}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<p style={{fontSize:13,color:"var(--t2)"}}>{exps.length} experiences</p>
<button className="btn btn-solid"style={{padding:"8px 16px",fontSize:12}}onClick={()=>{setShowEF(true);setEditE(null);setEf({technologies:[],description:[]});}}><Plus size={14}/>Add Experience</button></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
{exps.map((e:any)=><div key={e.id}className="glass"style={{padding:20}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
<span style={{fontFamily:"var(--din)",fontWeight:600,fontSize:16,color:"var(--t1)"}}>{e.company}</span>
<div style={{display:"flex",gap:4}}>
<button onClick={()=>{setEditE(e);setEf(e);setShowEF(true);}}style={{background:"none",border:"none",color:"var(--t2)",padding:4}}><Edit2 size={13}/></button>
<button onClick={()=>delE(e.id)}style={{background:"none",border:"none",color:"#f87171",padding:4}}><Trash2 size={13}/></button>
</div></div>
<p style={{fontSize:13,color:"var(--neon)",marginBottom:4}}>{e.role}</p>
<p style={{fontSize:12,color:"var(--t3)",marginBottom:12}}>{e.duration} | {e.location}</p>
<div style={{display:"flex",flexWrap:"wrap",gap:6}}>
{(e.technologies||[]).map((t:string,i:number)=><span key={i}className="tag"style={{fontSize:10,padding:"2px 6px"}}>{t}</span>)}
</div>
</div>)}
</div>
<AnimatePresence>{showEF&&<motion.div initial={{opacity:0}}animate={{opacity:1}}exit={{opacity:0}}className="modal-overlay">
<motion.div initial={{scale:0.9}}animate={{scale:1}}exit={{scale:0.9}}className="glass"style={{maxWidth:500,width:"100%",padding:28,maxHeight:"90vh",overflowY:"auto"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
<h2 style={{fontFamily:"var(--din)",fontWeight:700,fontSize:"1.2rem"}}>{editE?"Edit":"Add"} Experience</h2>
<button onClick={()=>setShowEF(false)}style={{background:"none",border:"none",color:"var(--t2)"}}><X size={18}/></button></div>
<div style={{display:"flex",flexDirection:"column",gap:10}}>
<input className={inp}placeholder="Company*"value={ef.company||""}onChange={e=>setEf(f=>({...f,company:e.target.value}))}/>
<input className={inp}placeholder="Role*"value={ef.role||""}onChange={e=>setEf(f=>({...f,role:e.target.value}))}/>
<input className={inp}placeholder="Duration (e.g. Jan 2023 - Present)"value={ef.duration||""}onChange={e=>setEf(f=>({...f,duration:e.target.value}))}/>
<input className={inp}placeholder="Location"value={ef.location||""}onChange={e=>setEf(f=>({...f,location:e.target.value}))}/>

<label style={{fontSize:12,color:"var(--t2)",marginTop:8}}>Responsibilities</label>
<div style={{display:"flex",gap:8}}>
<input className={inp}style={{flex:1}}placeholder="Add point"value={edi}onChange={e=>setEdi(e.target.value)}onKeyDown={e=>e.key==="Enter"&&addEDesc()}/>
<button onClick={addEDesc}className="btn btn-outline"style={{padding:"8px 14px",fontSize:12}}>Add</button>
</div>
<ul style={{fontSize:12,paddingLeft:16}}>
{(ef.description||[]).map((d:string,i:number)=><li key={i}>{d} <button onClick={()=>setEf(f=>({...f,description:f.description?.filter((_,ii)=>ii!==i)}))}style={{background:"none",border:"none",color:"red"}}>x</button></li>)}
</ul>

<label style={{fontSize:12,color:"var(--t2)",marginTop:8}}>Technologies</label>
<div style={{display:"flex",gap:8}}>
<input className={inp}style={{flex:1}}placeholder="Add tech"value={ei}onChange={e=>setEi(e.target.value)}onKeyDown={e=>e.key==="Enter"&&addETech()}/>
<button onClick={addETech}className="btn btn-outline"style={{padding:"8px 14px",fontSize:12}}>Add</button>
</div>
<div style={{display:"flex",flexWrap:"wrap",gap:6}}>
{(ef.technologies||[]).map((t:string,i:number)=><span key={i}className="tag">{t} <button onClick={()=>setEf(f=>({...f,technologies:f.technologies?.filter((_,ii)=>ii!==i)}))}style={{background:"none",border:"none",color:"red"}}>x</button></span>)}
</div>

<button onClick={saveE}className="btn btn-solid"style={{width:"100%",justifyContent:"center",marginTop:12}}>{editE?"Update":"Create"} Experience</button>
</div></motion.div></motion.div>}</AnimatePresence>
</div>}
{tab==="skills"&&`;
content = content.replace(/\{tab==="skills"&&/g, expPanel);

fs.writeFileSync(file, content, 'utf8');
console.log("Admin Dashboard Experience UI Injected.");
