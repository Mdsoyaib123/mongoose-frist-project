import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import validateRequest from '../../middlware/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlware/auth';
import { userRole } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(userRole.admin),
  validateRequest(studentValidations.createStudentValidationSchemaWithZod),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  auth(userRole.admin),
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  // auth(userRole.admin),
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = router;
