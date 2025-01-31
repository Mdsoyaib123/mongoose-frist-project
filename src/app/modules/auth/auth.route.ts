import { Router } from 'express';
import validateRequest from '../../middlware/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middlware/auth';
import { userRole } from '../user/user.constant';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);
router.post(
  '/change-password',
  auth(userRole.admin, userRole.student, userRole.faculty),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenValidationSchema),
  authController.refreshToken,
);

export const authRoutes = router;
