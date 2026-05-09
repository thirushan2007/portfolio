const fs = require('fs');
const path = require('path');
const http = require('http'); // assuming backend is http://localhost:8080

const API_URL = 'http://localhost:8080/api/skills';
const ICONS_DIR = path.join(__dirname, 'src', 'assets', 'icons');

// Mapping of skill names to their filenames
const iconMapping = {
  'React': 'react.png',
  'TypeScript': 'ts.png',
  'Tailwind': 'tailwind.png',
  'Java': 'java.png',
  'Spring': 'spring.png',
  'Node.js': 'nodejs.png',
  'MongoDB': 'mongo.png',
  'MySQL': 'mysql.png',
  'Solidity': 'solidity.png',
  'Flutter': 'flutter.png',
  'Docker': 'docker.png',
  'Git': 'git.png'
};

const normalize = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

function getBase64Image(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const bitmap = fs.readFileSync(filePath);
  const base64Str = Buffer.from(bitmap).toString('base64');
  return `data:image/png;base64,${base64Str}`;
}

async function updateSkills() {
  console.log('Fetching existing skills from DB...');
  
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch skills');
    
    const skills = await response.json();
    console.log(`Found ${skills.length} skills in the database.`);

    for (const skill of skills) {
      const normDbName = normalize(skill.name);
      let matchedFile = null;
      
      for (const [key, filename] of Object.entries(iconMapping)) {
        if (normalize(key) === normDbName || normDbName.includes(normalize(key))) {
          matchedFile = filename;
          break;
        }
      }

      if (matchedFile) {
        const filePath = path.join(ICONS_DIR, matchedFile);
        const base64Data = getBase64Image(filePath);
        
        if (base64Data) {
          skill.icon = base64Data;
          
          console.log(`Updating ${skill.name} with ${matchedFile} (Base64)...`);
          
          const updateRes = await fetch(`${API_URL}/${skill.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(skill)
          });
          
          if (updateRes.ok) {
            console.log(`Successfully updated ${skill.name}!`);
          } else {
            console.error(`Failed to update ${skill.name}`);
          }
        } else {
          console.log(`File not found for ${skill.name} at ${filePath}`);
        }
      } else {
        console.log(`No icon mapping found for ${skill.name}`);
      }
    }
    
    console.log('Finished updating skills in MongoDB!');
  } catch (error) {
    console.error('Error:', error);
  }
}

updateSkills();
