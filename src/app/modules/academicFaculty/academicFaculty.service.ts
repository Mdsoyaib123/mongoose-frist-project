import { TAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyModel } from './academicFaculty.model';

const createAcademicFaulty = async (payload: TAcademicFaculty) => {
  const result = await academicFacultyModel.create(payload);
  return result;
};

export const academicFacultyService = {
  createAcademicFaulty,
};
