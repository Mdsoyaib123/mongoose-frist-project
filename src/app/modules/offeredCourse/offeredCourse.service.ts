import QueryBuilder from '../../builder/QueryBuilder';
import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { academicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { courseModel } from '../course/course.model';
import { facultyModel } from '../Faculty/faculty.model';
import { semesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { StudentModel } from '../student/student.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { offeredCourseModel } from './offeredCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */

  //check if the semester registration id is exists!
  const isSemesterRegistrationExits =
    await semesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new Error('Semester registration not found !');
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  const isAcademicFacultyExits =
    await academicFacultyModel.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new Error('Academic Faculty not found !');
  }

  const isAcademicDepartmentExits =
    await academicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new Error('Academic Department not found !');
  }

  const isCourseExits = await courseModel.findById(course);

  if (!isCourseExits) {
    throw new Error('Course not found !');
  }

  const isFacultyExits = await facultyModel.findById(faculty);

  if (!isFacultyExits) {
    throw new Error('Faculty not found !');
  }

  // check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await academicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
 
  if (!isDepartmentBelongToFaculty) {
    throw new Error(
      `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExits.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await offeredCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new Error(`Offered course with same section is already exist!`);
  }

  // get the schedules of the faculties
  const assignedSchedules = await offeredCourseModel
    .find({
      semesterRegistration,
      faculty,
      days: { $in: days  },
    })
    .select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

    // if (hasTimeConflict(assignedSchedules, newSchedule)) {
    //   throw new AppError(
    //     httpStatus.CONFLICT,
    //     `This faculty is not available at that time ! Choose other time or day`,
    //   );
    // }

  const result = await offeredCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};




const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(offeredCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  //   const meta = await offeredCourseQuery.countTotal();

  return {
    // meta,
    result,
  };
};

const getMyOfferedCoursesFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  //pagination setup

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const student = await StudentModel.findOne({ id: userId });
  // find the student
  if (!student) {
    throw new Error('User is noty found');
  }

  //find current ongoing semester
  const currentOngoingRegistrationSemester =
    await semesterRegistrationModel.findOne({
      status: 'ONGOING',
    });

  if (!currentOngoingRegistrationSemester) {
    throw new Error('There is no ongoing semester registration!');
  }

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester?._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      '$semesterRegistration',
                      '$$currentOngoingRegistrationSemester',
                    ],
                  },
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourses',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCourses',
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: '$completedCourses',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisitesFulFilled: {
          $or: [
            { $eq: ['$course.preRequisiteCourses', []] },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCourseIds',
              ],
            },
          ],
        },

        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourses',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled: true,
      },
    },
  ];

  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await offeredCourseModel.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await offeredCourseModel.aggregate(aggregationQuery)).length;

  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await offeredCourseModel.findById(id);

  if (!offeredCourse) {
    throw new Error('Offered Course not found');
  }

  return offeredCourse;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await offeredCourseModel.findById(id);

  if (!isOfferedCourseExists) {
    throw new Error('Offered course not found !');
  }

  const isFacultyExists = await facultyModel.findById(faculty);

  if (!isFacultyExists) {
    throw new Error('Faculty not found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await semesterRegistrationModel.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new Error(
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await offeredCourseModel
    .find({
      semesterRegistration,
      faculty,
      days: { $in: days },
    })
    .select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  //   if (hasTimeConflict(assignedSchedules, newSchedule)) {
  //     throw new AppError(
  //       httpStatus.CONFLICT,
  //       `This faculty is not available at that time ! Choose other time or day`,
  //     );
  //   }

  const result = await offeredCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await offeredCourseModel.findById(id);

  if (!isOfferedCourseExists) {
    throw new Error('Offered Course not found');
  }

  const semesterRegistation = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus = await semesterRegistrationModel
    .findById(semesterRegistation)
    .select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new Error(
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const result = await offeredCourseModel.findByIdAndDelete(id);

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getMyOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
