import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  verifyEmail,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post(
  '/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

authRouter.get('/verify', verifyEmail);

authRouter.post(
  '/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

authRouter.post('/refresh', refreshUserSession);

authRouter.post('/logout', logoutUser);

export default authRouter;
