import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

export const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['student', 'admin', 'faculty'],
      },
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
        default:'in-progress'
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const userModel = model<TUser>('User', userSchema);
