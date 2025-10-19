const fs = require('fs');
const path = require('path');

// Define replacements
const replacements = [
  ['bg-blue-600', 'bg-green-600'],
  ['bg-blue-700', 'bg-green-700'],
  ['bg-blue-800', 'bg-green-800'],
  ['bg-blue-500', 'bg-green-500'],
  ['bg-blue-50', 'bg-green-50'],
  ['bg-blue-100', 'bg-green-100'],
  ['text-blue-600', 'text-green-600'],
  ['text-blue-500', 'text-green-500'],
  ['text-blue-700', 'text-green-700'],
  ['text-blue-800', 'text-green-800'],
  ['text-blue-900', 'text-green-900'],
  ['text-blue-400', 'text-green-400'],
  ['border-blue-500', 'border-green-500'],
  ['border-blue-200', 'border-green-200'],
  ['border-blue-400', 'border-green-400'],
  ['from-blue-600', 'from-green-600'],
  ['to-blue-700', 'to-green-700'],
  ['from-blue-700', 'from-green-700'],
  ['to-blue-800', 'to-green-800'],
  ['from-blue-50', 'from-green-50'],
  ['hover:bg-blue-700', 'hover:bg-green-700'],
  ['hover:bg-blue-800', 'hover:bg-green-800'],
  ['hover:bg-blue-600', 'hover:bg-green-600'],
  ['hover:bg-blue-500', 'hover:bg-green-500'],
  ['hover:text-blue-500', 'hover:text-green-500'],
  ['hover:text-blue-600', 'hover:text-green-600'],
  ['hover:border-blue-400', 'hover:border-green-400'],
  ['hover:border-blue-500', 'hover:border-green-500'],
  ['focus:ring-blue-500', 'focus:ring-green-500'],
  ['focus:border-blue-500', 'focus:border-green-500'],
  ['ring-blue-500', 'ring-green-500'],
];

// Additional files found
const files = [
  'src/app/(with-layout)/how-it-works/page.tsx',
  'src/components/AutoBIDApp.tsx',
  'src/app/(auth)/layout.tsx',
  'src/app/(with-layout)/privacy/page.tsx',
  'src/app/(with-layout)/contact/page.tsx',
];

const stats = {};

files.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;
  let fileReplacements = 0;

  replacements.forEach(([oldStr, newStr]) => {
    const regex = new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = (content.match(regex) || []).length;
    if (matches > 0) {
      content = content.replace(regex, newStr);
      fileReplacements += matches;
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    stats[filePath] = fileReplacements;
    console.log(`✅ ${filePath}: ${fileReplacements} replacements`);
  } else {
    console.log(`⏭️  ${filePath}: No changes needed`);
  }
});

console.log('\n📊 Summary:');
console.log(`Total files processed: ${files.length}`);
console.log(`Files modified: ${Object.keys(stats).length}`);
console.log(`Total replacements: ${Object.values(stats).reduce((a, b) => a + b, 0)}`);
