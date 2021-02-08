import crypto from 'crypto';
import mongoose from 'mongoose';
import { isEmail } from 'validator'; //npm install validator

// Schema
export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Name is too short'],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Name is too short'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be at least 5 characters'],
  },
  image: {
    imageName: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
  lastLoginDate: {
    type: Date,
    default: () => new Date(),
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});
