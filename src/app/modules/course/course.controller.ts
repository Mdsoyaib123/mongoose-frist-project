import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { courseService } from './course.service';
import sendResponse from '../../../utils/sendResponse';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.createCourseIntoDB(req.body);

  //   send Response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' course is Created ',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.getAllCourses(req.query);

  //send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Get All course  Data  ',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.getSingleCourse(
    req.params.academicFacultyId,
  );

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Get Single course Data ',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.deleteCourse(req.params.id);

  //   send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' delete course successfully ',
    data: result,
  });
});

// const updateAcademicFaculty = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.academicFacultyId;
//     const data = req.body;

//     // send Response
//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: '  AcademicFaculty Data is Updated ',
//       data: result,
//     });
//   },
// );

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
};
