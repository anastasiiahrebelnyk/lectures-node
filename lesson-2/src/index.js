import express from 'express';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import cors from 'cors';
import PinoHttp from 'pino-http';

const postPath = resolve('src', 'db', 'posts.json');
// console.log(postPath);

// app.set('json spaces', 8);

const getPosts = async () => {
  const data = await readFile(postPath, 'utf8');
  const posts = JSON.parse(data);
  return posts;
};

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

const logger = PinoHttp({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
      messageFormat:
        '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
      hideObject: true,
    },
  },
});
app.use(logger);

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
app.use(cors());

app.get('/', (request, response) => {
  console.log(request.method);
  console.log(request.url);
  response.send('<h1>Home page</h1>');
});

app.get('/posts', async (req, res) => {
  // const data = await readFile(postPath, 'utf8');
  // console.log(data);
  // const posts = JSON.parse(data);
  // res.send(posts); не читає null
  const posts = await getPosts();
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  // console.log(req.params); //дізнаємось id
  const { id } = req.params;
  // const data = await readFile(postPath, 'utf8');
  // const posts = JSON.parse(data);
  const posts = await getPosts();
  const result = posts.find((item) => item._id === id);
  res.json(result);
});

//пишеться внизу для того щоб зловити запити, адреси яких не існують
app.use((req, res) => {
  res.status(404).json({
    message: `${req.method} ${req.url} not found`,
  });
});

//обробник помилки function overloading middleware, пишемо в самому кінці, обов'язково 4 параметри (будь-яка функція, яка має 4 арг, буде розцінюватись як функція обробник помилок)
app.use((error, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  const message = isProd ? 'some error' : error.message;

  res.status(500).json({
    message,
  });
});

// console.log(process.env.PORT); //для деплою на конкретний хост

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running ${port} port`));
