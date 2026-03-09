import fs from 'fs';
import { parseArgs } from 'node:util';
import { readFile } from './readFile.js';
import { writeFile } from './writeFile.js';

const options = {
  input: { type: 'string', short: 'i' },
  output: { type: 'string', short: 'o', default: 'output.txt' },
  display: { type: 'boolean', short: 'd', default: false },
  furnished: { type: 'boolean', short: 'f', default: false },
  price: {
    type: 'string',
    short: 'p',
    default: Number.MAX_SAFE_INTEGER.toString(),
  },
};
const { values } = parseArgs({ options });

if (!values.input) {
  console.error(
    'Input file is required. Use -i or --input to specify the input file.',
  );
  process.exit(1);
}

const data = readFile(values.input);
const filteredData = data.filter((line) => {
  const [
    price,
    area,
    bedrooms,
    bathrooms,
    stories,
    mainroad,
    guestroom,
    basement,
    hotwaterheating,
    airconditioning,
    parking,
    prefarea,
    furnishingstatus,
  ] = line.split(',').map((item) => item.trim());
  return parseFloat(price) <= parseFloat(values.price) && values.furnished
    ? furnishingstatus === 'furnished'
    : true;
});
writeFile(values.output, filteredData);
