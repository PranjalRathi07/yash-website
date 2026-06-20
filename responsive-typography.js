const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'client/src/pages'),
  path.join(__dirname, 'client/src/components')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  
  content = content.replace(/(?<!(sm|md|lg|xl|2xl):)text-6xl\b/g, 'text-4xl md:text-5xl lg:text-6xl');
  content = content.replace(/(?<!(sm|md|lg|xl|2xl):)text-5xl\b/g, 'text-3xl md:text-4xl lg:text-5xl');
  content = content.replace(/(?<!(sm|md|lg|xl|2xl):)text-4xl\b/g, 'text-2xl md:text-3xl lg:text-4xl');

  content = content.replace(/px-8 md:px-16 lg:px-24/g, 'px-4 md:px-8 lg:px-16 xl:px-24');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated typography/spacing in ${filePath}`);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (filePath.endsWith('.jsx')) {
      processFile(filePath);
    }
  }
}

targetDirs.forEach(dir => walk(dir));
console.log('Typography update complete.');
