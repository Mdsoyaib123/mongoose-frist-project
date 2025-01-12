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
  const result = await courseService.getSingleCourse(req.params.id);

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

// update course
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await courseService.updateCourse(id, data);
  // send Response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: '  course data is Updated ',
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await courseService.assignFacultiesWithCourse(
      courseId,
      faculties,
    );

    //   send response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' assign faculty successfully ',
      data: result,
    });
  },
);

const removeFacultiesFromCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await courseService.removeFacultiesWithCourse(
      courseId,
      faculties,
    );

    //   send response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' Remove faculty from course  successfully ',
      data: result,
    });
  },
);

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
