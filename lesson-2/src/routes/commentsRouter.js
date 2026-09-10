import { Router } from 'express';
import { getComments } from '../controllers/commentsController.js';

const commentsRouter = Router();

commentsRouter.get('/', getComments);

export default commentsRouter;
