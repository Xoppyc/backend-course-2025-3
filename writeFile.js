import fs from 'fs';

export function writeFile(file, content) {
  fs.writeFileSync(file, content.join('\n'), 'utf-8');
}
