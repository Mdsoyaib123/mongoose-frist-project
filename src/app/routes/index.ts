import { Router } from 'express';
import { studentRoute } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academic.route';

const router = Router();

const moduleRoute = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
