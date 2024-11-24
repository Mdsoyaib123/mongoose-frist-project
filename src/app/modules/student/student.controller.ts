import { Request, Response } from 'express';
import { studentService } from './student.service';
import studentValidateSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { students: studentData } = req.body;
    // // use joi validation
    const { error, value } = studentValidateSchema.validate(studentData);

   

    const result = await studentService.createStudentIntoDB(value);


    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
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
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
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
