import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableField } from './course.constant';
import { TCourse } from './course.interface';
import { courseModel } from './course.model';

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

  // step-1 // basic course info updated
  const updateBasicInfo = await courseModel.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );

  // check if have any preRequisiteCourses
  if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
    // filter out the deleted field
    const deletedPreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await courseModel.findByIdAndUpdate(id, {
      $pull: {
        preRequisiteCourses: {
          course: { $in: deletedPreRequisites },
        },
      },
    });

    // filter out the deleted field
    const newPreRequisites = await preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted,
    );

    const newPreRequisitesCourses = await courseModel.findByIdAndUpdate(id, {
      $addToSet: {
        preRequisiteCourses: { $each: newPreRequisites },
      },
    });
  }
  const result = await courseModel
    .findById(id)
    .populate('preRequisiteCourses.course');

  return result;
};

const deleteCourse = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const courseService = {
  createCourseIntoDB,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
