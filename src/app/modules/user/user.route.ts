import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import validateRequest from '../../middlware/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchemaWithZod),
  userController.createStudent,
);

export const userRoutes = router;
