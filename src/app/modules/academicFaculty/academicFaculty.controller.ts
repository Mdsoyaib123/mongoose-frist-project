import { Request, Response } from 'express';
import { academicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../utils/sendResponse';

const createAcademicFaculty = async (req: Request, res: Response) => {

    
  const result = await academicFacultyService.createAcademicFaulty(req.body);

//   send Response 
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'all student data',
    data: result,
  });
};

export const academicFacultyController = {
    createAcademicFaculty
}