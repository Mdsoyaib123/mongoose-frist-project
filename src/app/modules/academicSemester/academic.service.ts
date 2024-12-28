import { TAcademicSemester } from './academic.interface';
import { AcademicSemesterModel } from './academic.model';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code ');
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const getAllAcademicSemester = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};
const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemesterModel.findOne({ _id: id });
  return result;
};

const updateAcademicSemester = async (
  id: string,
  semesterData: TAcademicSemester,
) => {
  const filter = { _id: id };
  const updateData = {
    $set: {
      name: semesterData.name,
      code: semesterData.code,
      year: semesterData.year,
      startMonth: semesterData.startMonth,
      endMonth: semesterData.endMonth,
    },
  };

  if (academicSemesterNameCodeMapper[semesterData.name] !== semesterData.code) {
    throw new Error('Invalid semester code ');
  }
  const result = await AcademicSemesterModel.updateOne(filter, updateData);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
