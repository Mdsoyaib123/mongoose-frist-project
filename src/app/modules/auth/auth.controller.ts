import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../../utils/sendResponse';
import config from '../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

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

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Access token is retrieved successfully  ',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
};
