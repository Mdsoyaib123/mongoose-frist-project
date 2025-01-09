import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generateAdminId, generatedStudentId, generateFacultyId } from './user.utils';
import { TFaculty } from '../Faculty/faculty.interface';
import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { facultyModel } from '../Faculty/faculty.model';
import { adminModel } from '../Admin/admin.model';

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
    throw new Error('Fail to create student ')
  }
};




const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new Error('Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new Error( 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await facultyModel.create([payload], { session });

    if (!newFaculty.length) {
      throw new Error( 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new Error( 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await adminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new Error( 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
};
