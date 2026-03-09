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
let values;
try {
  ({ values } = parseArgs({ options }));
} catch (error) {
  console.error(`Please, specify input file`);
  process.exit(1);
}
if (!values.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// readFile returns an array of lines, each line is a JSON string representing a house object
const data = readFile(values.input);
// Example line:
// {"price":"13300000","area":"7420","bedrooms":"4","bathrooms":"2","stories":"3","mainroad":"yes","guestroom":"no","basement":"no","hotwaterheating":"no","airconditioning":"yes","parking":"2","prefarea":"yes","furnishingstatus":"furnished"}
const filteredData = [];
for (const line of data) {
  if (!line.trim()) continue;
  const obj = JSON.parse(line);

  const withinPrice = values.price
    ? parseFloat(obj.price) <= parseFloat(values.price)
    : true;
  const furnishedOk = values.furnished
    ? obj.furnishingstatus === 'furnished'
    : true;

  if (withinPrice && furnishedOk) {
    const pushedObj = JSON.stringify(obj)
      .replace(/[{}"]/g, '')
      .replace(/,/g, ', ');
    values.display && console.log(`Hose: ${data.indexOf(line) + 1}`);
    filteredData.push(pushedObj);
    values.display && console.log(pushedObj);
  }
}

writeFile(
  values.output,
  filteredData.map((obj) => JSON.stringify(obj)),
);
