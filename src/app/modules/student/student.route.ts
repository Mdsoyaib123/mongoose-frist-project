import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

// will call controller function
router.get('/', studentController.getAllStudent);
router.get('/:id', studentController.getSingleStudentController);
router.patch('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export const studentRoute = router;
