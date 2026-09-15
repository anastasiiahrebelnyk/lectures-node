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
    attach: {
      // required: false,
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

postSchema.index({ type: 1 });

export const postSortFields = [
  'text',
  'type',
  'userId',
  'createdAt',
  'updatedAt',
];

const Post = model('Post', postSchema);
// Post => posts
// Category => categories
// mouse => mice

export default Post;
