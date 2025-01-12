import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableField } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { courseFacultyModel, courseModel } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await courseModel.create(payload);
  return result;
};
const getAllCourses = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    courseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = courseQuery.modelQuery;
  return result;
};
const getSingleCourse = async (id: string) => {
  console.log(id);
  const result = await courseModel
    .findById(id)
    .populate('preRequisiteCourses.course');
  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // step-1 // basic course info updated
    const updateBasicInfo = await courseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateBasicInfo) {
      throw new Error('Field to update course ');
    }

    // check if have any preRequisiteCourses
    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
      // filter out the deleted field
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPreRequisites },
            },
          },
        },
        { session, new: true, runValidators: true },
      );

      if (!deletedPreRequisiteCourses) {
        throw new Error('Field to update course ');
      }

      // filter out the deleted field
      const newPreRequisites = await preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisitesCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: newPreRequisites },
          },
        },
        { session, new: true, runValidators: true },
      );

      if (!newPreRequisitesCourses) {
        throw new Error('Field to update course ');
      }
    }

    const result = await courseModel
      .findById(id)
      .populate('preRequisiteCourses.course');

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Field to update course ');
  }
};

const deleteCourse = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultiesWithCourse = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {

  const result = await courseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {
        faculties: { $each: payload },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};




const removeFacultiesWithCourse = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
console.log(payload)
  const result = await courseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull:{
        faculties: { $in : payload}
      }
    },
    {
     
      new: true,
    },
  );
  return result;
};

export const courseService = {
  createCourseIntoDB,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse
};
