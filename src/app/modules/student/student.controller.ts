import { studentService } from './student.service';

import sendResponse from '../../../utils/sendResponse';
import HttpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudent = catchAsync(async (req, res, next) => {
  const result = await studentService.getAllStudentFromDB();

  // send Response
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'all student data',
    data: result,
  });
});

const getSingleStudentController: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudentFromDB(id);

  // send response
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'single student data',
    data: result,
  });
};

export const studentController = {
  getAllStudent,
  getSingleStudentController,
};
