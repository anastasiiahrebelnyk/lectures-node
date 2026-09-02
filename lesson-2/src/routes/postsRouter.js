import { Router } from 'express';
import { getPostById, getPosts } from '../controllers/postsController.js';

const postsRouter = Router();

postsRouter.get('/', getPosts);

postsRouter.get('/:id', getPostById);

export default postsRouter;
