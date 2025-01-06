/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';

const globalErrorHan = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default values
  let statusCode =  500;
  let message = 'Something went wrong ';

  let errorSources: TErrorSources[] = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifyError = handleZodError(err);

    statusCode = simplifyError?.statusCode;
    message = simplifyError?.message;
    errorSources = simplifyError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifyError = handleValidationError(err);

    statusCode = simplifyError?.statusCode;
    message = simplifyError?.message;
    errorSources = simplifyError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifyError = handleCastError(err);

    statusCode = simplifyError?.statusCode;
    message = simplifyError?.message;
    errorSources = simplifyError?.errorSources;
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    error: err,
  });
};

export default globalErrorHan;
