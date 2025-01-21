import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { semesterRegistrationModel } from './semesterRegistration.model';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  // check if there any semester already registered that is 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await semesterRegistrationModel.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new Error(
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} semester`,
    );
  }

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

  const result = (await semesterRegistrationModel.create(payload)).populate(
    'academicSemester',
  );
  return result;
};

const getAllSemesterRegistration = async (payload: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    semesterRegistrationModel.find().populate('academicSemester'),
    payload,
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const singleSemesterRegistration = async (id: string) => {
  const result = await semesterRegistrationModel.findById(id);
  return result;
};

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //if the requested registered semester is exits
  const isSemesterRegistrationExit =
    await semesterRegistrationModel.findById(id);
  const requestedSemesterStatus = payload?.status;

  if (!isSemesterRegistrationExit) {
    throw new Error('semesterRegistration is not found ');
  }

  // if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExit?.status;

  if (currentSemesterStatus === 'ENDED') {
    throw new Error('The semester is ended  ');
  }

  // UPCOMING=> ONGOING=> ENDED
  if (
    currentSemesterStatus === 'UPCOMING' &&
    requestedSemesterStatus === 'ENDED'
  ) {
    throw new Error('You can not update status UPCOMING to ENDED');
  }
  if (
    currentSemesterStatus === 'ONGOING' &&
    requestedSemesterStatus === 'UPCOMING'
  ) {
    throw new Error('You can not update status ONGOING to UPCOMING');
  }

  const result = await semesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  singleSemesterRegistration,
  updateSemesterRegistration,
};
