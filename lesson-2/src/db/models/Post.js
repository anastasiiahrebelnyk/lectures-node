import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      enum: ['text', 'image', 'video', 'combine'],
    },
  },
  { versionKey: false, timestamps: true },
);

const Post = model('Post', postSchema);
// Post => posts
// Category => categories
// mouse => mice

export default Post;

// import { Schema, model } from "mongoose";

// const postSchema = new Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     default: "text",
//     enum: ["text", "image", "video", "combine"],
//   },
// });

// const Post = model("Post", postSchema);

// export default Post;
