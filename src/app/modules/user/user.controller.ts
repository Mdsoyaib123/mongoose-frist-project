/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.service';
import HttpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';

const catchAsync = (fn:RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req,res,next)).catch(err=>next(err))
  };
};

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const result = await userServices.createStudentIntoDB(password, studentData);
  // send response
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'student is created successfully',
    data: result,
  });
})

export const userController = {
  createStudent,
};
