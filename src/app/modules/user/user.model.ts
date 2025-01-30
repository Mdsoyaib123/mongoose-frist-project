/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { userStatus } from './user.constant';

export const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select:0
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
      enum: userStatus,
      default: 'in-progress',
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

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_saltRound),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExitByCustomId = async function (id: string) {
  return await userModel.findOne({ id });
};
userSchema.statics.isUserDeleted = async function (id: string) {
  return await userModel.findOne({ id });
};
userSchema.statics.isStatus = async function (id: string) {
  return await userModel.findOne({ id });
};

userSchema.statics.passwordMatch = async function (plainTextPass, hashedPass) {
  return await bcrypt.compare(plainTextPass, hashedPass);
};

export const userModel = model<TUser, UserModel>('User', userSchema);
