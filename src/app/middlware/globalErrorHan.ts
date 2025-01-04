/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';

const globalErrorHan = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong ';

  let errorSources: TErrorSources[] = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  const handleZodError = (err: ZodError) => {
    const statusCode = 400;
    const errorSources: TErrorSources[] = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    return {
      statusCode,
      message: ' validation error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifyError = handleZodError(err);

    statusCode = simplifyError?.statusCode;
    message = simplifyError?.message;
    errorSources = simplifyError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    // error: err,
  });
};

export default globalErrorHan;
