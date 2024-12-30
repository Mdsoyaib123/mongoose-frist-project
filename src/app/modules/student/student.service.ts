import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { userModel } from '../user/user.model';

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find()
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ _id: id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};




const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();

  try {
     session.startTransaction();

     const update = {
      $set:{
        isDeleted: true
      }
     }

    const deletedUser = await userModel.findOneAndUpdate(
      { id },
      update,
      {new:true, session },
    );
    
    if (!deletedUser) {
      throw new Error('Failed to delete user ');
    }

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      update,
      {new:true, session },
    );
    if (!deletedStudent) {
      throw new Error('Failed to delete student ');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudent,
};
