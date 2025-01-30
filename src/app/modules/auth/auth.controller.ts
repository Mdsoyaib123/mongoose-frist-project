import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../../utils/sendResponse';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' user is logged in successfully  ',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {

  const { ...passwordData } = req.body;
  const result = await authService.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' password change successfully  ',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
};
