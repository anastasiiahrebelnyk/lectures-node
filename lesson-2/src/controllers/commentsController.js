// import createHttpError from 'http-errors';
import Comment from '../db/models/Comment.js';

export const getComments = async (req, res) => {
  const comments = await Comment.find().populate('postId', 'text');
  res.json(comments);
};
