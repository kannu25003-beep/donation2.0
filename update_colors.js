const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'src');

const replacements = [
  // Maroon (Primary: #800020 -> #C1440E) -> rgb(193, 68, 14)
  { regex: /rgba\(\s*128\s*,\s*0\s*,\s*32\s*,/g, replace: 'rgba(193, 68, 14,' },
  { regex: /#800020/gi, replace: '#C1440E' },
  
  // Secondary (Gold: #D4AF37 -> #E8C468) -> rgb(232, 196, 104)
  { regex: /rgba\(\s*212\s*,\s*175\s*,\s*55\s*,/g, replace: 'rgba(232, 196, 104,' },
  { regex: /#D4AF37/gi, replace: '#E8C468' },
  
  // Accent (Terracotta -> Accent Red: #A62639) -> rgb(166, 38, 57)
  { regex: /rgba\(\s*199\s*,\s*91\s*,\s*57\s*,/g, replace: 'rgba(166, 38, 57,' },
  { regex: /#C75B39/gi, replace: '#A62639' },
  
  // Backgrounds
  { regex: /#0D0208/gi, replace: '#E6DBC3' },
  { regex: /#1A0810/gi, replace: '#FAF3E0' },
  { regex: /#2A1018/gi, replace: '#FFFFFF' },

  // Typography
  { regex: /#FFF5E6/gi, replace: '#3D2817' },
  { regex: /#CCAD8F/gi, replace: '#5C4129' },
  
  // Update hover glow and glass borders for the lighter theme
  { regex: /rgba\(\s*13\s*,\s*2\s*,\s*8\s*,\s*0\.85\s*\)/g, replace: 'rgba(230, 219, 195, 0.85)' },
  { regex: /rgba\(\s*26\s*,\s*8\s*,\s*16\s*,\s*0\.8\s*\)/g, replace: 'rgba(250, 243, 224, 0.8)' },
  { regex: /rgba\(\s*42\s*,\s*16\s*,\s*24\s*,\s*0\.75\s*\)/g, replace: 'rgba(255, 255, 255, 0.75)' },
  { regex: /rgba\(\s*128\s*,\s*0\s*,\s*32\s*,\s*0\.6\s*\)/g, replace: 'rgba(250, 243, 224, 0.6)' }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.css')) {
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
console.log('Colors replaced successfully!');
