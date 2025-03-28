import { TAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const result = await academicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartment = async () => {
  const result = await academicDepartmentModel
    .find().populate('academicFaculty')
  return result;
};
const getSingleAcademicDepartment = async (id: string) => {
  const result = await academicDepartmentModel.findOne({ _id: id }).populate('academicFaculty');
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const filter = { _id: id };
  const update = {
    $set: {
      name: payload.name,
    },
  };
  const result = await academicDepartmentModel.findOneAndUpdate(filter, update);
  return result;
};

export const academicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
