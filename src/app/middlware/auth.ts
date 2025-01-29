import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // validation

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
        const { id, role } = decode;

        req.user = decode as JwtPayload;
      },
    );

    next();
  });
};

export default auth;
