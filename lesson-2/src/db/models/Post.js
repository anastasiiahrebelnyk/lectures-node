import { Schema, model } from 'mongoose';
import { postTypeList } from '../../constants/postConstants.js';

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: postTypeList[0],
      enum: postTypeList,
    },
  },
  { versionKey: false, timestamps: true },
);

postSchema.index({ type: 1 });

export const postSortFields = ['text', 'type', 'createdAt', 'updatedAt'];

const Post = model('Post', postSchema);
// Post => posts
// Category => categories
// mouse => mice

export default Post;
