import { Router } from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlware/validateRequest';
import { academicSemeserValidation } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemeserValidation.CreateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);

router.get('/', academicSemesterController.getAllAcademicSemester);
router.get(
  '/:semesterId',
  academicSemesterController.getSingleAcademicSemester,
);
router.put('/:semesterId', academicSemesterController.updateAcademicSemester);

export const AcademicSemesterRoutes = router;
