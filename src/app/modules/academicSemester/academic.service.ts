import { TAcademicSemester } from './academic.interface';
import { AcademicSemesterModel } from './academic.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemesterModel.create(payload);

  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
