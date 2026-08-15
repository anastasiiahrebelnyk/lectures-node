import * as fs from 'node:fs/promises';

fs.writeFile('write.txt', 'Hello world!')
  .then((data) => console.log('Done!'))
  .catch((error) => console.log(error));
