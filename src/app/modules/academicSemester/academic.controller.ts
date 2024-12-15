import catchAsync from '../../../utils/catchAsync';
import { academicSemesterServices } from './academic.service';
import sendResponse from '../../../utils/sendResponse';
import { HttpStatus } from 'http-status';

const createAcademicSemester = catchAsync(async (req, res) => {
  const data = req.body;

  const result =
    await academicSemesterServices.createAcademicSemesterIntoDB(data);

  sendResponse(res, {
    statusCode:200,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
};
