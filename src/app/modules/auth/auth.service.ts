import config from '../../config';
import { userModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
const loginUser = async (payload: TLoginUser) => {
  const userData = await userModel.isUserExitByCustomId(payload?.id);
  // check user already exit using statics method
  if (!userData) {
    throw new Error('The user is not found');
  }

  // check if the user is already deleted using statics method

  if ((await userModel.isUserDeleted(payload?.id)).isDeleted) {
    throw new Error('The user is deleted ');
  }

  // check if the user is blocked

  const Status = await userModel.isUserExitByCustomId(payload?.id);
  if (Status?.status === 'blocked') {
    throw new Error('The user is blocked ');
  }

  //   //   check if the password is correct using static method
  if (!(await userModel.passwordMatch(payload?.password, userData?.password))) {
    throw new Error('The password is incorrect');
  }

  //   access granted : send access token and refresh token
  // crate token and send to client
  const jwtData = {
    id: userData.id,
    role: userData.role,
  };

  const accessToken = jwt.sign(jwtData, config?.jwt_access_token as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: userData?.needsPasswordChange,
  };
};




export const authService = {
  loginUser,
};
