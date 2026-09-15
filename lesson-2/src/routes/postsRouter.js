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
import upload from '../middlewares/upload.js';

const postsRouter = Router();

postsRouter.use(authenticate);

postsRouter.get('/', celebrate(getPostsSchema), getPosts);

postsRouter.get('/:id', celebrate(postIdSchema), getPostById);

// upload.array('attach', 8); // передати кілька файлів в одному полі, де цифра  - макс кількість

// upload.fields([{ //якщо файли в кількох полях, назва поля - макс кількість
//   name: 'attach',
//   maxCount: 1
// }]);

postsRouter.post(
  '/',
  upload.single('attach'),
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
