import Post from '../db/models/Post.js';
import createHttpError from 'http-errors';
import Comment from '../db/models/Comment.js';

export const getPosts = async (req, res) => {
  // const data = await readFile(postPath, 'utf8');
  // console.log(data);
  // const posts = JSON.parse(data);
  // res.send(posts); не читає null
  // const posts = await getPosts();
  const posts = await Post.find();
  res.json(posts);
};

export const getPostById = async (req, res) => {
  // console.log(req.params); //дізнаємось id
  const { id } = req.params;
  // const data = await readFile(postPath, 'utf8');
  // const posts = JSON.parse(data);
  // const posts = await getPosts();
  const singlePost = await Post.findById(id);
  if (!singlePost) {
    throw createHttpError(404, `Post with id=${id} not found`);
    // throw new Error(`Post with id=${id} not found`);
    // return res.status(404).json({
    //   message: `Post with id=${id} not found`
    // });
  }

  // const result = posts.find((item) => item._id === id);
  res.json(singlePost);
};

export const addPost = async (req, res) => {
  // console.log(req.body);
  const newPost = await Post.create(req.body);
  res.status(201).json(newPost);
};

export const updatePostId = async (req, res) => {
  const { id } = req.params;
  const updatePost = await Post.findByIdAndUpdate(id, req.body, {
    returnDocument: 'after',
  });
  if (!updatePost) {
    throw createHttpError(404, `Post with id=${id} not found`);
  }
  res.json(updatePost);
};

export const deletePostById = async (req, res) => {
  const { id } = req.params;
  const deletePost = await Post.findByIdAndDelete(id);
  if (!deletePost) {
    throw createHttpError(404, `Post with id=${id} not found`);
  }
  // res.json(deletePost);
  res.status(204).json(deletePost);
};

export const addCommentToPostById = async (req, res) => {
  const { id } = req.params;
  const existPost = await Post.findById(id);
  if (!existPost) {
    throw createHttpError(404, `Post with id=${id} not found`);
  }
  const newComment = await Comment.create({ ...req.body, postId: id });
  res.status(201).json(newComment);
};

export const getCommentsByPostId = async (req, res) => {
  const { id } = req.params;
  const existPost = await Post.findById(id);
  if (!existPost) {
    throw createHttpError(404, `Post with id=${id} not found`);
  }
  const comments = await Comment.find({ postId: id });
  res.json(comments);
};
