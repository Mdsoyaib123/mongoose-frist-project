import { Router } from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = Router();

router.post(
  '/',
  validateRequest(
   academicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  academicFacultyController.createAcademicFaculty,
);
router.get('/', academicFacultyController.getAllAcademicFaculty);
router.get(
  '/:academicFacultyId',
  academicFacultyController.getSingleAcademicFaculty,
);
router.put(
  '/:academicFacultyId',
  academicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
