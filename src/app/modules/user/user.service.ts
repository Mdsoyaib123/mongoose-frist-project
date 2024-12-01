import config from '../../config';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {

    // create a user
  const userData: Partial<TUser> = {};

  // if password not sent from client , use default password
  userData.password = password || (config.default_pass as string);

  // set user role
  userData.role = 'student';

  //   set manually generated id
  userData.id = '2030100001';

  const newUser = await userModel.create(userData);

  //   create student
  if (newUser._id) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
