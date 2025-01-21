import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { semesterRegistrationService } from './semesterRegistration.servise';
import sendResponse from '../../../utils/sendResponse';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await semesterRegistrationService.createSemesterRegistration(
      req.body,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' create semesterRegistration  successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.getAllSemesterRegistration();

    //   send response 
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' get all semesterRegistration data  ',
      data: result,
    });
    
  },
);
const SingleSemesterRegistration =catchAsync(async (req:Request,res:Response)=>{
const id = req.params.id
const result = await semesterRegistrationService.singleSemesterRegistration(id)

  //   send response 
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' get single semesterRegistration data  ',
    data: result,
  });
})
export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  SingleSemesterRegistration
};
