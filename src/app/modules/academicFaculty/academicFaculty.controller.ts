import { Request, Response } from 'express';
import { academicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../utils/sendResponse';

const createAcademicFaculty = async (req: Request, res: Response) => {
  const result = await academicFacultyService.createAcademicFaulty(req.body);

  //   send Response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' AcademicFaculty is Created ',
    data: result,
  });
};

const getAllAcademicFaculty = async (req: Request, res: Response) => {
  const result = await academicFacultyService.getAllAcademicFaculty();

  //send response 
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Get All AcademicFaculty Data  ',
    data: result,
  });
};
const getSingleAcademicFaculty = async (req:Request,res:Response)=>{
    const result  = await academicFacultyService.getSingleAcademicFaculty(req.params.academicFacultyId)
    
    // send response 
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: ' Get Single AcademicFaculty Data ',
        data: result,
    })
}
const updateAcademicFaculty = async (req:Request,res:Response)=>{
    const id = req.params.academicFacultyId
    const data = req.body
    const result = await academicFacultyService.updateAcademicFaculty(id,data)

    // send Response 
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: '  AcademicFaculty Data is Updated ',
        data: result,
    })
}

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
};
