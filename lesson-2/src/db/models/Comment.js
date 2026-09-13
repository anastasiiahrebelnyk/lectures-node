import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    text: {
      type: String,
      minLength: 3,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Comment = model('Comment', commentSchema);
export default Comment;
