import { Router } from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middlware/validateRequest';
import { semesterRegistrationValidation } from './semesterRegistration.validation';

const router = Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
