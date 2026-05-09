const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'pages', 'AdminDashboard.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add 'FileText' to imports
content = content.replace(
  /Briefcase,\n\} from "lucide-react";/,
  'Briefcase,\n  FileText,\n} from "lucide-react";'
);

// 2. Add 'resumeService' to imports
content = content.replace(
  /experienceService,\n\} from "\.\.\/services\/portfolioService";/,
  'experienceService,\n  resumeService,\n} from "../services/portfolioService";'
);

// 3. Update 'Tab' type
content = content.replace(
  /\| "experience";/,
  '| "experience"\n  | "resume";'
);

// 4. Add 'Resume' to navItems
content = content.replace(
  /\{ id: "messages", icon: MessageSquare, label: "Messages" \},/,
  '{ id: "resume", icon: FileText, label: "Resume" },\n    { id: "messages", icon: MessageSquare, label: "Messages" },'
);

// 5. Add Resume UI section
const resumeUI = `          {tab === "resume" && (
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
          {tab === "messages" && (`;

content = content.replace(/\{tab === "messages" && \(/, resumeUI);

fs.writeFileSync(file, content, 'utf8');
console.log("Admin Dashboard Resume Tab Injected.");
