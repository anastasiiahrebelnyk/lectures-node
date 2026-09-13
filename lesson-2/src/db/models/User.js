import { Schema, model } from 'mongoose';
import { emailRegex } from '../../constants/authConstants';

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const User = model('User', userSchema);
