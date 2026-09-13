import { celebrate } from 'celebrate';
import { Router } from 'express';
import { registerUserSchema } from '../validation/authValidation.js';
import { registerUser } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post(
  '/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

export default authRouter;
