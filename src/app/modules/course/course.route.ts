import { Router } from "express";
import validateRequest from "../../middlware/validateRequest";
import { courseValidation } from "./course.validation";
import { courseController } from "./course.controller";

const router = Router();

router.post(
  '/create-course',
  validateRequest(
   courseValidation.createCourseValidationSchema
  ),
  courseController.createCourse,
);
router.get('/', courseController.getAllCourse);
router.get(
  '/:id',
  courseController.getSingleCourse,
);
// router.put(
//   '/:academicFacultyId',
//   academicFacultyController.updateAcademicFaculty,
// );
router.delete('/:id' , courseController.deleteCourse)

export const courseRoutes = router;
