import Post from '../db/models/Post.js';
import createHttpError from 'http-errors';
import Comment from '../db/models/Comment.js';

export const getPosts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = '_id',
    sortOrder = 'asc',
    type,
    search,
  } = req.query;
  const { _id: userId } = req.user;
  const skip = (page - 1) * perPage;
  const postQuery = Post.find();

  //! QUERY BUILDER
  if (userId) {
    postQuery.where('userId').equals(userId);
  }
  if (type) {
    postQuery.where('type').equals(type);
  }
  if (search) {
    postQuery.where({
      // text: {
      //   $regex: search, // входження в підстроку
      //   options: "i", //без вразування регістру
      // }

      // пошук по кільком полям
      $or: [
        {
          text: {
            $regex: search, // входження в підстроку
            $options: 'i', //без вразування регістру
          },
        },
        {
          type: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    });
  }
  // if (createdMin) {
  //   postQuery.where('createdAt').gte(createdMin);
  // };

  // if (createdMax) {
  //   postQuery.where('createdAt').lte(createdMax);
  // };

  const [posts, totalItems] = await Promise.all([
    postQuery
      .clone()
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      })
      .populate('userId', 'username'),
    postQuery.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);
  res.json({
    posts,
    totalItems,
    totalPages,
    page,
    perPage,
  });
  console.log(req.query);

  res.json(posts);
};

export const getPostById = async (req, res) => {
  // console.log(req.params); //дізнаємось id
  const { id } = req.params;
  const { _id: userId } = req.user;
  // const data = await readFile(postPath, 'utf8');
  // const posts = JSON.parse(data);
  // const posts = await getPosts();
  const singlePost = await Post.findOne({ _id: id }, userId);
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
  const { _id: userId } = req.user;

  // console.log(req.body);
  const newPost = await Post.create({ ...req.body, userId });
  await newPost.populate('userId', 'username');
  res.status(201).json(newPost);
};

export const updatePostId = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const updatePost = await Post.findOneAndUpdate(
    { _id: id, userId },
    req.body,
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );
  if (!updatePost) {
    throw createHttpError(404, `Post with id=${id} not found`);
  }
  res.json(updatePost);
};

export const deletePostById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const deletePost = await Post.findOneAndDelete({ _id: id, userId });
  if (!deletePost) {
    throw createHttpError(404, `Post with id=${id} not found`);
  }
  // res.json(deletePost);
  res.status(204).json(deletePost);
};

export const addCommentToPostById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const existPost = await Post.findById(id);
  if (!existPost) {
    throw createHttpError(404, `Post with id=${id} not found`);
  }
  const newComment = await Comment.create({ ...req.body, postId: id, userId });
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
