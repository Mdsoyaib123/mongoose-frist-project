import { Router } from 'express';
import validateRequest from '../../middlware/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';
import auth from '../../middlware/auth';

const router = Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse,
);
router.get('/',auth('admin'), courseController.getAllCourse);
router.get('/:id', auth('admin','faculty','student'),courseController.getSingleCourse);
router.put(
  '/:id',
  auth('admin'),
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
  auth('admin'),
  validateRequest(courseValidation.courseFacultiesValidationSchema),
  courseController.removeFacultiesFromCourse,
);
router.delete('/:id', courseController.deleteCourse);

export const courseRoutes = router;
