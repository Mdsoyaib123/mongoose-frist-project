import { Request, Response } from 'express';
import { userServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {

    const { password, student: studentData } = req.body;

    const result = await userServices.createStudentIntoDB(password, studentData);

    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error._message,
    });
  }
};

export const userController = {
  createStudent,
};
