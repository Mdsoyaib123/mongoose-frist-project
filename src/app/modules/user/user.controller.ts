import {  RequestHandler } from 'express';
import { userServices } from './user.service';
import HttpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';

const createStudent :RequestHandler= async (
  req,
  res,
  next,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );
    // send response 
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
};
