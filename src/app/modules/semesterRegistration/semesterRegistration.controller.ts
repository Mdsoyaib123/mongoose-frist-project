import { Request, Response } from "express"
import catchAsync from "../../../utils/catchAsync"
import { semesterRegistrationService } from "./semesterRegistration.servise"
import sendResponse from "../../../utils/sendResponse"

const createSemesterRegistration =catchAsync(async(req:Request,res:Response)=>{
const result = await semesterRegistrationService.createSemesterRegistration(req.body)

sendResponse(res,{
    statusCode: 200,
    success: true,
    message: ' create semesterRegistration  successfully',
    data: result,
})
})

export const semesterRegistrationController = {
    createSemesterRegistration ,
}