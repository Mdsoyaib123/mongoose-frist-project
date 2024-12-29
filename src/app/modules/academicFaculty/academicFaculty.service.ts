import { TAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyModel } from './academicFaculty.model';

const createAcademicFaulty = async (payload: TAcademicFaculty) => {
  const result = await academicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFaculty = async () => {
  const result = await academicFacultyModel.find();
  return result;
};
const getSingleAcademicFaculty = async (id: string) => {
  const result = await academicFacultyModel.findOne({ _id: id });
  return result;
};

const updateAcademicFaculty = async (id: string, payload:TAcademicFaculty) => {
  const filter = { _id: id };
  const update = {
    $set: {
      name: payload.name,
    },
  };
  const result = await academicFacultyModel.updateOne(filter, update);
  return result;
};

export const academicFacultyService = {
  createAcademicFaulty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
};
