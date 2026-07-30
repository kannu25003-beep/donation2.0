const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /#6B0F1A/gi, replace: '#B85C38' },
  { regex: /#F0E5CC/gi, replace: '#FBE4CC' },
  { regex: /#1A1A1A/gi, replace: '#3A2E26' },
  { regex: /rgba\(107,\s*15,\s*26/gi, replace: 'rgba(184, 92, 56' }, // rgb equivalent of 6B0F1A to B85C38
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
