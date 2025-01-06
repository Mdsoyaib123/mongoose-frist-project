import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { userModel } from '../user/user.model';
import { Student } from './student.interface';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const result = await StudentModel.find({
    $or: ['name.fristName', 'email', 'age'].map((filed) => ({
      [filed]: { $regex: searchTerm, $options: 'i' },
    })),
  })
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
  const result = await StudentModel.findOne({ id: id })
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

const updateStudentFromDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id: id },
    modifiedUpdatedData,
    { new: true },
  );
  return result;
};

const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const update = {
      $set: {
        isDeleted: true,
      },
    };

    const deletedUser = await userModel.findOneAndUpdate({ id }, update, {
      new: true,
      session,
    });

    if (!deletedUser) {
      throw new Error('Failed to delete user ');
    }

    const deletedStudent = await StudentModel.findOneAndUpdate({ id }, update, {
      new: true,
      session,
    });
    if (!deletedStudent) {
      throw new Error('Failed to delete student ');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudent,
};
