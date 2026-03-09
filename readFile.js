import fs from 'fs';

export function readFile(file) {
  let content = 'if you see this, something went wrong';
  try {
    content = fs.readFileSync(file, 'utf-8').split('\n');
  } catch (error) {
    console.error(`Cannot find input file`);
    process.exit(1);
  }
  return content;
}
