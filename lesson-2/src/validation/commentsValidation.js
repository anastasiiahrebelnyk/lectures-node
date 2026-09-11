import { Segments, Joi } from 'celebrate';
import { idSchema } from './index.js';

export const createCommentSchema = {
  [Segments.PARAMS]: Joi.object({
    id: idSchema.required(),
  }),
  [Segments.BODY]: Joi.object({
    text: Joi.string().min(3).required(),
  }),
};
