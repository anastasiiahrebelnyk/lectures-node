import * as fs from 'node:fs/promises';

fs.readFile('text.txt', { encoding: 'utf-8' })
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
