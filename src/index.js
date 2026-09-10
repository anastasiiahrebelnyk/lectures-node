import express from 'express';
// import { readFile } from 'node:fs/promises';
// import { resolve } from 'node:path';
import cors from 'cors';

import 'dotenv/config';
import postsRouter from '../lesson-2/src/routes/postsRouter.js';
import commentsRouter from '../lesson-2/src/routes/commentsRouter.js';
// const postPath = resolve('src', 'db', 'posts.json');
// console.log(postPath);

// app.set('json spaces', 8);

import connectDatabase from '../lesson-2/src/db/connectDatabase.js';
import logger from '../lesson-2/src/middlewares/logger.js';
import notFoundHandler from '../lesson-2/src/middlewares/notFoundHandler.js';
import errorHandler from '../lesson-2/src/middlewares/errorHandler.js';

// const getPosts = async () => {
//   const data = await readFile(postPath, 'utf8');
//   const posts = JSON.parse(data);
//   return posts;
// };

const app = express();

//! middleware
// app.use((req, res, next) => {
//   console.log('First middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Second middleware');
//   next();
// });

//request - вся інформація про запит зібрана в об'єкт
// response - налаштування і відправка запиту
//! CORS - налаштування, але використовують пакет npm i cors
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type',
//   );
//   next();
// });

// const corsMiddleware = cors();
// app.use(corsMiddleware);
app.use(express.json());
app.use(logger);
app.use(cors());
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
// app.get('/', (request, response) => {
//   console.log(request.method);
//   console.log(request.url);
//   response.send('<h1>Home page</h1>');
// });

//пишеться внизу для того щоб зловити запити, адреси яких не існують
app.use(notFoundHandler);

//обробник помилки function overloading middleware, пишемо в самому кінці, обов'язково 4 параметри (будь-яка функція, яка має 4 арг, буде розцінюватись як функція обробник помилок)
app.use(errorHandler);

// console.log(process.env.PORT); //для деплою на конкретний хост

//hellohello123 - anastasiia

await connectDatabase();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running ${port} port`));
