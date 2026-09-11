import { Segments, Joi } from 'celebrate';
import { postTypeList } from '../constants/postConstants.js';
import { idSchema } from './index.js';
import { postSortFields } from '../db/models/Post.js';

export const getPostsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(1000).default(10),
    sortBy: Joi.string()
      .valid(...postSortFields)
      .default('_id'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
    type: Joi.string().valid(...postTypeList),
    search: Joi.string(),
  }),
};

export const createPostSchema = {
  [Segments.BODY]: Joi.object({
    text: Joi.string().required().messages({
      'any.required': 'text must be exist',
      'base.string': 'text must be string',
    }),
    type: Joi.string()
      .valid(...postTypeList)
      .default(postTypeList[0]),
  }),
};

export const postIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: idSchema.required(),
  }),
};

export const updatePostSchema = {
  [Segments.PARAMS]: Joi.object({
    id: idSchema.required(),
  }),
  [Segments.BODY]: Joi.object({
    text: Joi.string().messages({
      'any.required': 'text must be exist',
    }),
    type: Joi.string().valid(...postTypeList),
  }).min(1),
};
