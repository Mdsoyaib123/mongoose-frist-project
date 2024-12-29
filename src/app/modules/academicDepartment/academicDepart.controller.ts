import { Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { academicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.createAcademicDepartment(req.body);

    //   send Response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' AcademicDepartment is Created ',
      data: result,
    });
  },
);

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.getAllAcademicDepartment();

    //send response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' Get All AcademicDepartment Data  ',
      data: result,
    });
  },
);
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {

    const result = await academicDepartmentService.getSingleAcademicDepartment(
      req.params.academicDepartmentId,
    );

    // send response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' Get Single AcademicDepartment Data ',
      data: result,
    });
  },
);
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.academicDepartmentId;
    const data = req.body;
    const result = await academicDepartmentService.updateAcademicDepartment(id, data);

    // send Response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: '  AcademicDepartment Data is Updated ',
      data: result,
    });
  },
);

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
