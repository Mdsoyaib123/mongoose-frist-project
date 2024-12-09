import { userServices } from './user.service';
import HttpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';


const createStudent = catchAsync(async (req, res) => {
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
