import { Router } from 'express';
import validateRequest from '../../middlware/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

export const authRoutes = router;
