/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';

import QueryBuilder from '../../builder/QueryBuilder';
import { userModel } from '../user/user.model';
import { facultyModel } from './faculty.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    facultyModel.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await facultyModel
    .findById(id)
    .populate('academicDepartment');
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await facultyModel.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await facultyModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new Error('Failed to delete faculty');
    }

    // get user _id from deletedFaculty
    const userId = deletedFaculty.user;

    const deletedUser = await userModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new Error('Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
