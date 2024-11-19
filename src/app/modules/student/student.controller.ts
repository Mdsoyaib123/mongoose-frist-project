import { Request, Response } from 'express';
import { studentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { students: studentData } = req.body;
    const result = await studentService.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'all student data',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudentController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudentFromDB(id);
  res.status(200).json({
    success: true,
    message: 'single student data',
    data: result,
  });
};

export const studentController = {
  createStudent,
  getAllStudent,
  getSingleStudentController,
};
