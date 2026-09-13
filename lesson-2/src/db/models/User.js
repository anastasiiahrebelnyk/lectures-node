import { Schema, model } from 'mongoose';
import { emailRegex } from '../../constants/authConstants.js';

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

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model('User', userSchema);
