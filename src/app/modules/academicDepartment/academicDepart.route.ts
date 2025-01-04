import { Router } from 'express';
import validateRequest from '../../middlware/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepart.controller';

const router = Router();

router.post(
  '/',
  // validateRequest(
  //  academicDepartmentValidation.createAcademicDepartmentValidationSchema
  // ),
  academicDepartmentController.createAcademicDepartment,
);
router.get('/', academicDepartmentController.getAllAcademicDepartment);
router.get(
  '/:academicDepartmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);
router.put(
  '/:academicDepartmentId',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema
   ),
  academicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
