import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getPostById,
  getPosts,
  addPost,
  updatePostId,
  deletePostById,
  addCommentToPostById,
  getCommentsByPostId,
} from '../controllers/postsController.js';
import {
  createPostSchema,
  getPostsSchema,
  postIdSchema,
  updatePostSchema,
} from '../validation/postsValidation.js';
import { createCommentSchema } from '../validation/commentsValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

const postsRouter = Router();

postsRouter.use(authenticate);

postsRouter.get('/', celebrate(getPostsSchema), getPosts);

postsRouter.get('/:id', celebrate(postIdSchema), getPostById);

postsRouter.post(
  '/',
  celebrate(createPostSchema, { abortEarly: false }),
  addPost,
);

postsRouter.patch(
  '/:id',
  celebrate(updatePostSchema, { abortEarly: false }),

  updatePostId,
);

postsRouter.delete('/:id', celebrate(postIdSchema), deletePostById);

postsRouter.post(
  '/:id/comment',
  celebrate(createCommentSchema, { abortEarly: false }),
  addCommentToPostById,
);

postsRouter.get(
  '/:id/comment',
  celebrate(createCommentSchema),
  getCommentsByPostId,
);

export default postsRouter;
