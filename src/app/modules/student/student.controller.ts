import { studentService } from './student.service';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentFromDB();

  // send Response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'all student data',
    data: result,
  });
});

const getSingleStudentController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudentFromDB(id);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'single student data',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const {student} = req.body;
  const result = await studentService.updateStudentFromDB(id,student);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' student data updated',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.deleteStudent(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' student data deleted',
    data: result,
  });
});

export const studentController = {
  getAllStudent,
  getSingleStudentController,
  updateStudent,
  deleteStudent,
};
