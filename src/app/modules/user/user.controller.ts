import { userServices } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';


const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await userServices.createStudentIntoDB(password, studentData);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'student is created successfully',
    data: result,
  });
})



const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});


export const userController = {
  createStudent,
  createFaculty,
  createAdmin
};
