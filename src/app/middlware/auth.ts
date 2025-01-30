import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { userModel } from '../modules/user/user.model';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error(' You are not Authorized! ');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;
    const { id, role, iat } = decoded;

    const userData = await userModel.isUserExitByCustomId(id);
    // check user already exit using statics method
    if (!userData) {
      throw new Error('The user is not found');
    }

    // check if the user is already deleted using statics method
    if ((await userModel.isUserDeleted(id)).isDeleted) {
      throw new Error('The user is deleted ');
    }

    // check if the user is blocked
    const Status = await userModel.isUserExitByCustomId(id);
    if (Status?.status === 'blocked') {
      throw new Error('The user is blocked ');
    }

    if (
      userData.passwordChangeAt &&
      userModel.isJwtIssuedBeforePasswordChange(
        userData.passwordChangeAt,
        iat as number,
      )
    ) {
      throw new Error('You are not Authorized !!!!');
    }
    
    // role base Authorized
    if (requiredRole && !requiredRole.includes(role)) {
      throw new Error('You are not Authorized !!!!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
