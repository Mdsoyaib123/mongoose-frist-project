import express from 'express';

import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middlware/validateRequest';
import auth from '../../middlware/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/',auth(userRole.admin,userRole.faculty), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
