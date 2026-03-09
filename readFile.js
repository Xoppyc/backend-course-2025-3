import fs from 'fs';

export function readFile(file) {
  const content = fs.readFileSync(file, 'utf-8').split('\n');
  return content;
}
