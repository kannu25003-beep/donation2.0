const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'src');

const replacements = [
  // Primary (Maroon: #6B0F1A -> #800020)
  { regex: /#6B0F1A/gi, replace: '#800020' },
  { regex: /rgba\(\s*107\s*,\s*15\s*,\s*26\s*,/g, replace: 'rgba(128, 0, 32,' },

  // Secondary (Gold: #C9A227 -> #D4AF37)
  { regex: /#C9A227/gi, replace: '#D4AF37' },
  { regex: /rgba\(\s*201\s*,\s*162\s*,\s*39\s*,/g, replace: 'rgba(212, 175, 55,' },

  // Accent (Orange: #E85D04 -> #C75B39)
  { regex: /#E85D04/gi, replace: '#C75B39' },
  
  // Backgrounds
  { regex: /#FDF6E3/gi, replace: '#0D0208' }, // bg-dark
  { regex: /#FAF3E0/gi, replace: '#1A0810' }, // bg-medium
  { regex: /#FFFFFF/gi, replace: '#2A1018' }, // bg-light

  // Additional background fixes if they are still #F0E5CC
  { regex: /#F0E5CC/gi, replace: '#0D0208' },

  // Typography
  { regex: /#1A1A1A/gi, replace: '#FFF5E6' },
  { regex: /#404040/gi, replace: '#CCAD8F' },

  // Update hover glow and glass borders for the darker theme
  { regex: /rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.7\s*\)/g, replace: 'rgba(42, 16, 24, 0.75)' },
  { regex: /rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.4\s*\)/g, replace: 'rgba(13, 2, 8, 0.85)' },
  { regex: /rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.9\s*\)/g, replace: 'rgba(26, 8, 16, 0.8)' }
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
console.log('Dark theme colors applied successfully!');
