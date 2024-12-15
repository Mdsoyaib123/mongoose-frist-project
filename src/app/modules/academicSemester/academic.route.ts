import { Router } from 'express';
import { academicSemesterController } from './academic.controller';

const router = Router();

router.post(
  '/create-academic-semester',
  academicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
