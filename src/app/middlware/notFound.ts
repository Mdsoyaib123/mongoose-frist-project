/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpStatus from 'http-status';


import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api not found',
    error: '',
  });
};

export default notFound;
