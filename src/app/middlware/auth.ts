import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error(' You are not Authorized! ');
    }

    // check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_token as string,
      function (err, decode) {
        if (err) {
          throw new Error('You are not Authorized !!!!');
        }

        // check role base activity 
        const role = (decode as JwtPayload)?.role;
        if (requiredRole && !requiredRole.includes(role)) {
          throw new Error('You are not Authorized !!!!');
        }

        req.user = decode as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
