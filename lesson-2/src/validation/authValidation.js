import { Joi, Segments } from 'celebrate';
import { emailRegex } from '../constants/authConstants.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(3),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(7).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(7).required(),
  }),
};
