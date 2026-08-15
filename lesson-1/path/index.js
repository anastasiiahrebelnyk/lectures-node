import path from 'node:path';

console.log(path.join('folder', '..', 'src', 'scripts', 'main.js'));
// повертає відносний шлях

console.log(path.resolve('folder', '..', 'src', 'scripts', 'main.js'));
// повертає абсолютний шлях (від кореня проєкту)

const extname = path.extname(path.join('folder', 'main.js'));
console.log(extname);

const basename = path.basename(path.join('folder', 'main.js'), extname);
console.log(basename);
