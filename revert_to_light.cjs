const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'src');

const replacements = [
  // Primary
  { regex: /#800020/gi, replace: '#6B0F1A' },
  { regex: /rgba\(\s*128\s*,\s*0\s*,\s*32\s*,/g, replace: 'rgba(107, 15, 26,' },

  // Secondary
  { regex: /#D4AF37/gi, replace: '#C9A227' },
  { regex: /rgba\(\s*212\s*,\s*175\s*,\s*55\s*,/g, replace: 'rgba(201, 162, 39,' },

  // Accent
  { regex: /#C75B39/gi, replace: '#E85D04' },
  
  // Backgrounds
  { regex: /#0D0208/gi, replace: '#FDF6E3' }, // bg-dark
  { regex: /#1A0810/gi, replace: '#FAF3E0' }, // bg-medium
  { regex: /#2A1018/gi, replace: '#FFFFFF' }, // bg-light

  // Typography
  { regex: /#FFF5E6/gi, replace: '#1A1A1A' },
  { regex: /#CCAD8F/gi, replace: '#404040' },

  // Home Hero Overlay Revert (from manual fix)
  { regex: /rgba\(\s*13\s*,\s*2\s*,\s*8\s*,\s*0\.85\s*\)/g, replace: 'rgba(240, 229, 204, 0.85)' },
  { regex: /rgba\(\s*26\s*,\s*8\s*,\s*16\s*,\s*0\.8\s*\)/g, replace: 'rgba(253, 246, 227, 0.8)' },
  { regex: /rgba\(\s*42\s*,\s*16\s*,\s*24\s*,\s*0\.75\s*\)/g, replace: 'rgba(255, 255, 255, 0.75)' },

  // Navbar Backgrounds Revert
  { regex: /rgba\(\s*13\s*,\s*2\s*,\s*8\s*,\s*0\.95\s*\)/g, replace: 'rgba(253, 246, 227, 0.95)' },
  { regex: /rgba\(\s*13\s*,\s*2\s*,\s*8\s*,\s*0\.98\s*\)/g, replace: 'rgba(253, 246, 227, 0.98)' },

  // Reverse hover glow and glass borders for the darker theme
  { regex: /rgba\(\s*42\s*,\s*16\s*,\s*24\s*,\s*0\.75\s*\)/g, replace: 'rgba(255, 255, 255, 0.7)' },
  { regex: /rgba\(\s*13\s*,\s*2\s*,\s*8\s*,\s*0\.85\s*\)/g, replace: 'rgba(255, 255, 255, 0.4)' },
  { regex: /rgba\(\s*26\s*,\s*8\s*,\s*16\s*,\s*0\.8\s*\)/g, replace: 'rgba(255, 255, 255, 0.9)' },

  // Contact.css form input revert
  { regex: /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.2\s*\)/g, replace: 'rgba(255, 255, 255, 0.8)' }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const rule of replacements) {
        if (rule.regex.test(content)) {
          content = content.replace(rule.regex, rule.replace);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir(cssDir);
console.log('Light theme colors reverted successfully!');
