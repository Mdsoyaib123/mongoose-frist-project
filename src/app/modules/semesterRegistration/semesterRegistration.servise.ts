import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { semesterRegistrationModel } from './semesterRegistration.model';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  // check if the semester is exits
  const isAcademicSemesterExit = await AcademicSemesterModel.findById(
    payload?.academicSemester,
  );
  if (!isAcademicSemesterExit) {
    throw new Error('academicSemester not exits');
  }

  //   check if this semesterRegistration already exit or not
  const isSemesterRegistrationExit = await semesterRegistrationModel.findOne({
    academicSemester: payload.academicSemester,
  });
  if (isSemesterRegistrationExit) {
    throw new Error('semesterRegistration already registered ');
  }

  const result = (await semesterRegistrationModel.create(payload)).populate('academicSemester');
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistration,
};
