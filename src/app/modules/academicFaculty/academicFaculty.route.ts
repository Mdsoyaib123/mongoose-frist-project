import { Router } from 'express';
import { academicFacultyController } from './academicFaculty.controller';

const router = Router();

router.post('/', academicFacultyController.createAcademicFaculty);
router.get('/',academicFacultyController.getAllAcademicFaculty);
router.get('/:academicFacultyId', academicFacultyController.getSingleAcademicFaculty);
router.put('/:academicFacultyId',academicFacultyController.updateAcademicFaculty)

export const AcademicFacultyRoutes = router;