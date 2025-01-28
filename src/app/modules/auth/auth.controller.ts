import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../../utils/sendResponse";

const loginUser = catchAsync(async(req:Request,res:Response)=>{
const result = await authService.loginUser(req.body)

sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' check login  ',
    data: result,
  });
})

export const authController ={
    loginUser
}