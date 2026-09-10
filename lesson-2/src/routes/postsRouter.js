import { Router } from 'express';
import {
  getPostById,
  getPosts,
  addPost,
  updatePostId,
  deletePostById,
  addCommentToPostById,
  getCommentsByPostId,
} from '../controllers/postsController.js';

const postsRouter = Router();

postsRouter.get('/', getPosts);

postsRouter.get('/:id', getPostById);

postsRouter.post('/', addPost);

postsRouter.patch('/:id', updatePostId);

postsRouter.delete('/:id', deletePostById);

postsRouter.post('/:id/comment', addCommentToPostById);

postsRouter.get('/:id/comment', getCommentsByPostId);

export default postsRouter;
