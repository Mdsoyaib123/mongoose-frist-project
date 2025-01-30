/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { userRole } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'student' | 'admin' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExitByCustomId(id: string): Promise<TUser>;
  isUserDeleted(id: string): Promise<TUser>;
  isStatus(id: string): Promise<TUser>;
  passwordMatch(plainTextPass: string, hashedPass: string): Promise<boolean>;
}

export type TUserRole = keyof typeof userRole;
// export type NewUser = {
//   id:string
//   password: string;
//   role: string;
// };
