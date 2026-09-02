import Post from '../db/models/Post.js';
import createHttpError from 'http-errors';

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
  if (!result) {
    throw createHttpError(404, 'Post with id=${id} not found');
    // throw new Error(`Post with id=${id} not found`);
    // return res.status(404).json({
    //   message: `Post with id=${id} not found`
    // });
  }
  const result = await Post.findById(id);

  // const result = posts.find((item) => item._id === id);
  res.json(result);
};
