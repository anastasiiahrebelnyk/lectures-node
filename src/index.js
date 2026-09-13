import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import 'dotenv/config';
import postsRouter from '../lesson-2/src/routes/postsRouter.js';
import commentsRouter from '../lesson-2/src/routes/commentsRouter.js';

import connectDatabase from '../lesson-2/src/db/connectDatabase.js';
import logger from '../lesson-2/src/middlewares/logger.js';
import notFoundHandler from '../lesson-2/src/middlewares/notFoundHandler.js';
import errorHandler from '../lesson-2/src/middlewares/errorHandler.js';
import authRouter from '../lesson-2/src/routes/authRouter.js';

const app = express();

app.use(express.json());
app.use(logger);
app.use(cors());

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// console.log(process.env.PORT); //для деплою на конкретний хост

await connectDatabase();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running ${port} port`));
