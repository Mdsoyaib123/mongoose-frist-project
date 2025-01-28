import { userModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // check user already exit using statics method 
if (!await userModel.isUserExitByCustomId(payload?.id)) {
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

//   //   check if the password is correct
//   const passwordMatch = await bcrypt.compare(
//     payload.password,
//     isUserExit?.password,
//   );
//   if (!passwordMatch) {
//     throw new Error('The password is incorrect');
//   }

  //   access granted : send access token and refresh token

  return {};
};
export const authService = {
  loginUser,
};
