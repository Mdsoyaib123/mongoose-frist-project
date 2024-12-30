import mongoose from 'mongoose';
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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set id
    userData.id = await generatedStudentId(admissionSemesterData);

    // create a user( transaction-1)
    const newUser = await userModel.create([userData], { session });

    //   create student
    if (!newUser.length) {
      throw new Error('Filed to create user ');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    // create a student ( transaction-2)
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new Error('Filed to create Student ');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
    
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const userServices = {
  createStudentIntoDB,
};
