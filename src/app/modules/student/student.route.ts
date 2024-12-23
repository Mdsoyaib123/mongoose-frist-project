import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

// will call controller function
router.get('/', studentController.getAllStudent);
router.get('/single-student/:id',studentController.getSingleStudentController)


export const studentRoute = router;
