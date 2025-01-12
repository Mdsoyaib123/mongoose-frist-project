import { Router } from 'express';
import validateRequest from '../../middlware/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';

const router = Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse,
);
router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);
router.put(
  '/:id',
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidation.courseFacultiesValidationSchema),
  courseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(courseValidation.courseFacultiesValidationSchema),
  courseController.removeFacultiesFromCourse,
);
router.delete('/:id', courseController.deleteCourse);

export const courseRoutes = router;
