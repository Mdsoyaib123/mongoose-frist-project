import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { userModel } from '../user/user.model';
import { Student } from './student.interface';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  console.log('search and query ', query);

  const queryObj = { ...query };

  // searching
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const studentSearchAbleField = ['name.fristName', 'email', 'age'];

  const searchQuery = StudentModel.find({
    $or: studentSearchAbleField.map((filed) => ({
      [filed]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // filtering
  const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeField.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // use sort
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  // use pagination and limit
  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);

  // field limiting
  let fields = '-__v';
  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ');
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
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
