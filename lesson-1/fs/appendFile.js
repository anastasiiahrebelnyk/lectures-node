import * as fs from 'node:fs/promises';

fs.appendFile('write.txt', '\nHello\n')
  .then((data) => console.log('Done!'))
  .catch((error) => console.log(error));

//!  \n - пробіл  -t - табуляція(2 пробіли)
