import { Router } from 'express';
import { studentRoute } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from './../modules/academicDepartment/academicDepart.route';

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
  {
    path:'/academic-faculty',
    route:AcademicFacultyRoutes
  },
  {
    path:'/academic-department',
    route:AcademicDepartmentRoutes
  }
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
