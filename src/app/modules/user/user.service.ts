import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: Student) => {
  // create a student
  const userData: Partial<TUser> = {};

  // if password not sent from client , use default password
  userData.password = password || (config.default_pass as string);

  // set Student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemesterData = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  // set id
  userData.id = await generatedStudentId(admissionSemesterData);

  const newUser = await userModel.create(userData);

  //   create student
  if (newUser._id) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
